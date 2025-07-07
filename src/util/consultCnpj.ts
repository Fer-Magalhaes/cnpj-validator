
export interface Porte {
  id: string;
  descricao: string;
}

export interface NaturezaJuridica {
  id: string;
  descricao: string;
}

export interface QualificacaoDoResponsavel {
  id: number;
  descricao: string;
}

export interface Socio {
  [key: string]: any;
}

export interface Simples {
  simples: "Sim" | "Não";
  data_opcao_simples: string | null;
  data_exclusao_simples: string | null;
  mei: "Sim" | "Não";
  data_opcao_mei: string | null;
  data_exclusao_mei: string | null;
  atualizado_em: string;
}

export interface AtividadeSecundaria {
  id: string;
  secao: string;
  divisao: string;
  grupo: string;
  classe: string;
  subclasse: string;
  descricao: string;
}
export type AtividadePrincipal = AtividadeSecundaria;

export interface Pais {
  id: number;
  iso2: string;
  iso3: string;
  nome: string;
  comex_id: string;
}

export interface Estado {
  id: number;
  nome: string;
  sigla: string;
  ibge_id: number;
}

export interface Cidade {
  id: number;
  nome: string;
  ibge_id: number;
  siafi_id: string;
}

export interface InscricaoEstadual {
  inscricao_estadual: string;
  ativo: boolean;
  atualizado_em: string;
  estado: Estado;
}

export interface Estabelecimento {
  cnpj: string;
  cnpj_raiz: string;
  cnpj_ordem: string;
  cnpj_digito_verificador: string;
  tipo: string;
  nome_fantasia: string | null;

  tipo_logradouro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  nome_cidade_exterior: string | null;

  ddd1: string;
  telefone1: string;
  ddd2: string | null;
  telefone2: string | null;
  ddd_fax: string | null;
  fax: string | null;
  email: string;

  situacao_cadastral: string;
  data_situacao_cadastral: string;
  motivo_situacao_cadastral: string | null;
  situacao_especial: string | null;
  data_situacao_especial: string | null;
  atualizado_em: string;

  atividade_principal: AtividadePrincipal;
  atividades_secundarias: AtividadeSecundaria[];

  pais: Pais;
  estado: Estado;
  cidade: Cidade;

  inscricoes_estaduais: InscricaoEstadual[];
}

export interface CnpjResponse {
  cnpj_raiz: string;
  razao_social: string;
  capital_social: string;
  responsavel_federativo: string;
  atualizado_em: string;

  porte: Porte;
  natureza_juridica: NaturezaJuridica;
  qualificacao_do_responsavel: QualificacaoDoResponsavel;

  socios: Socio[];
  simples: Simples;
  estabelecimento: Estabelecimento;
}

function logCnpjInfo(info: CnpjResponse) {
  console.log("🚀 CNPJ Info");
  console.log(`• Razão Social: ${info.razao_social}`);
  console.log(`• Capital Social: R$ ${info.capital_social}`);
  console.log(`• Atualizado em: ${info.atualizado_em}`);
  console.log("\n🏢 Estabelecimento");
  console.log(`• CEP: ${info.estabelecimento.cep}`);
  console.log(`• Atualizado em: ${info.estabelecimento.atualizado_em}`);
 
}

export async function getCnpjInfo(rawCnpj: string): Promise<CnpjResponse> {
  const cleanCnpj = rawCnpj.replace(/\D+/g, "");
let dots = 0;
const interval = setInterval(() => {
    dots = (dots + 1) % 4;
    process.stdout.write(`\rConsultando CNPJ${".".repeat(dots)}   `);
}, 400);

// Stop the interval after the request completes
try {
  const url = `https://publica.cnpj.ws/cnpj/${cleanCnpj}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(
      `Erro ao buscar CNPJ ${cleanCnpj}: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as CnpjResponse;
  clearInterval(interval);
  process.stdout.write("\r".padEnd(40) + "\r"); // Clear the line
  console.log(logCnpjInfo(data));
  return data;
} catch (error) {
  clearInterval(interval);
  process.stdout.write("\r".padEnd(40) + "\r");
  throw error;
}
}
