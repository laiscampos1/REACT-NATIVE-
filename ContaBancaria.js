import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// ─── Máscaras simples ─────────────────────────────────────────────────────────
const mascararCPF = (v) => {
  v = v.replace(/\D/g, '').slice(0, 11);
  if (v.length <= 3) return v;
  if (v.length <= 6) return `${v.slice(0,3)}.${v.slice(3)}`;
  if (v.length <= 9) return `${v.slice(0,3)}.${v.slice(3,6)}.${v.slice(6)}`;
  return `${v.slice(0,3)}.${v.slice(3,6)}.${v.slice(6,9)}-${v.slice(9)}`;
};

const mascararTelefone = (v) => {
  v = v.replace(/\D/g, '').slice(0, 11);
  if (v.length <= 2) return `(${v}`;
  if (v.length <= 7) return `(${v.slice(0,2)}) ${v.slice(2)}`;
  if (v.length <= 11) return `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
  return v;
};

const mascararData = (v) => {
  v = v.replace(/\D/g, '').slice(0, 8);
  if (v.length <= 2) return v;
  if (v.length <= 4) return `${v.slice(0,2)}/${v.slice(2)}`;
  return `${v.slice(0,2)}/${v.slice(2,4)}/${v.slice(4)}`;
};

const mascararCEP = (v) => {
  v = v.replace(/\D/g, '').slice(0, 8);
  if (v.length <= 5) return v;
  return `${v.slice(0,5)}-${v.slice(5)}`;
};

// ─── Etapas do formulário ─────────────────────────────────────────────────────
const ETAPAS = ['Dados Pessoais', 'Contato', 'Endereço', 'Tipo de Conta', 'Confirmação'];

// ─── Componente: indicador de progresso ──────────────────────────────────────
const IndicadorEtapa = ({ etapaAtual }) => (
  <View style={styles.indicadorWrap}>
    {ETAPAS.map((_, i) => (
      <React.Fragment key={i}>
        <View style={[
          styles.bolinha,
          i < etapaAtual  && styles.bolinhaFeita,
          i === etapaAtual && styles.bolinhaAtiva,
        ]}>
          <Text style={[
            styles.bolinhaNum,
            (i <= etapaAtual) && styles.bolinhaNumAtiva,
          ]}>
            {i < etapaAtual ? '✓' : i + 1}
          </Text>
        </View>
        {i < ETAPAS.length - 1 && (
          <View style={[styles.linha, i < etapaAtual && styles.linhaFeita]} />
        )}
      </React.Fragment>
    ))}
  </View>
);

// ─── Componente: campo de texto ───────────────────────────────────────────────
const Campo = ({ label, valor, onChange, placeholder, keyboardType = 'default', maxLength, erro }) => (
  <View style={styles.campoWrap}>
    <Text style={styles.campoLabel}>{label}</Text>
    <TextInput
      style={[styles.input, erro && styles.inputErro]}
      value={valor}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor="#bbb"
      keyboardType={keyboardType}
      maxLength={maxLength}
    />
    {erro ? <Text style={styles.erroTexto}>{erro}</Text> : null}
  </View>
);

// ─── Componente: opção de tipo de conta ──────────────────────────────────────
const OpcaoConta = ({ titulo, descricao, icone, selecionado, onPress }) => (
  <TouchableOpacity
    style={[styles.opcaoConta, selecionado && styles.opcaoContaSelecionada]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={styles.opcaoIcone}>{icone}</Text>
    <View style={{ flex: 1 }}>
      <Text style={[styles.opcaoTitulo, selecionado && styles.opcaoTituloSelecionado]}>
        {titulo}
      </Text>
      <Text style={styles.opcaoDescricao}>{descricao}</Text>
    </View>
    <View style={[styles.radio, selecionado && styles.radioSelecionado]}>
      {selecionado && <View style={styles.radioPonto} />}
    </View>
  </TouchableOpacity>
);

// ─── Tela de sucesso ──────────────────────────────────────────────────────────
const TelaSucesso = ({ dados, onReiniciar }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.sucessoScroll}>
      <View style={styles.sucessoIconeWrap}>
        <Text style={styles.sucessoIcone}>✅</Text>
      </View>
      <Text style={styles.sucessoTitulo}>Conta aberta com sucesso!</Text>
      <Text style={styles.sucessoSubtitulo}>
        Seu pedido foi recebido e está em análise. Em até 2 dias úteis você receberá um e-mail de confirmação.
      </Text>

      <View style={styles.resumoCard}>
        <Text style={styles.resumoTitulo}>Resumo da solicitação</Text>
        {[
          ['Nome',         dados.nome],
          ['CPF',          dados.cpf],
          ['Data de nasc.',dados.dataNasc],
          ['E-mail',       dados.email],
          ['Telefone',     dados.telefone],
          ['Cidade / UF',  `${dados.cidade} / ${dados.uf}`],
          ['Tipo de conta',dados.tipoConta],
        ].map(([k, v]) => (
          <View key={k} style={styles.resumoLinha}>
            <Text style={styles.resumoChave}>{k}</Text>
            <Text style={styles.resumoValor}>{v}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.btnNovaConta} onPress={onReiniciar}>
        <Text style={styles.btnNovaContaTexto}>Abrir nova conta</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);

// ─── App principal ────────────────────────────────────────────────────────────
export default function App() {
  const [etapa, setEtapa] = useState(0);
  const [concluido, setConcluido] = useState(false);

  const [dados, setDados] = useState({
    nome: '', cpf: '', dataNasc: '', nomeMae: '',
    email: '', telefone: '',
    cep: '', logradouro: '', numero: '', bairro: '', cidade: '', uf: '',
    tipoConta: 'Conta Corrente',
    semTarifa: false, cartaoCredito: false, investimentos: false,
    termos: false,
  });

  const [erros, setErros] = useState({});

  const atualizar = (campo, valor) => {
    setDados((prev) => ({ ...prev, [campo]: valor }));
    setErros((prev) => ({ ...prev, [campo]: null }));
  };

  // Validações por etapa
  const validar = () => {
    const e = {};
    if (etapa === 0) {
      if (!dados.nome.trim())         e.nome     = 'Nome obrigatório';
      if (dados.cpf.replace(/\D/g,'').length < 11) e.cpf = 'CPF inválido';
      if (dados.dataNasc.replace(/\D/g,'').length < 8) e.dataNasc = 'Data inválida';
      if (!dados.nomeMae.trim())      e.nomeMae  = 'Nome da mãe obrigatório';
    }
    if (etapa === 1) {
      if (!dados.email.includes('@')) e.email    = 'E-mail inválido';
      if (dados.telefone.replace(/\D/g,'').length < 10) e.telefone = 'Telefone inválido';
    }
    if (etapa === 2) {
      if (dados.cep.replace(/\D/g,'').length < 8) e.cep = 'CEP inválido';
      if (!dados.logradouro.trim())   e.logradouro = 'Logradouro obrigatório';
      if (!dados.numero.trim())       e.numero   = 'Número obrigatório';
      if (!dados.bairro.trim())       e.bairro   = 'Bairro obrigatório';
      if (!dados.cidade.trim())       e.cidade   = 'Cidade obrigatória';
      if (dados.uf.length !== 2)      e.uf       = 'UF inválida (ex: SP)';
    }
    if (etapa === 4) {
      if (!dados.termos)              e.termos   = 'Você precisa aceitar os termos';
    }
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const avancar = () => { if (validar()) setEtapa((p) => p + 1); };
  const voltar  = () => setEtapa((p) => p - 1);
  const enviar  = () => { if (validar()) setConcluido(true); };
  const reiniciar = () => { setDados({ nome:'',cpf:'',dataNasc:'',nomeMae:'',email:'',telefone:'',cep:'',logradouro:'',numero:'',bairro:'',cidade:'',uf:'',tipoConta:'Conta Corrente',semTarifa:false,cartaoCredito:false,investimentos:false,termos:false }); setEtapa(0); setConcluido(false); };

  if (concluido) return <TelaSucesso dados={dados} onReiniciar={reiniciar} />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1b5e20" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>🏦 Banco Verde</Text>
        <Text style={styles.headerSubtitulo}>Abertura de Conta Digital</Text>
      </View>

      {/* Indicador de etapas */}
      <IndicadorEtapa etapaAtual={etapa} />
      <Text style={styles.etapaNome}>{ETAPAS[etapa]}</Text>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.formScroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* ── Etapa 0: Dados Pessoais ─────────────────────────── */}
          {etapa === 0 && (
            <View>
              <Campo label="Nome completo *" valor={dados.nome} onChange={(v) => atualizar('nome', v)} placeholder="Ex: Maria Souza" erro={erros.nome} />
              <Campo label="CPF *" valor={dados.cpf} onChange={(v) => atualizar('cpf', mascararCPF(v))} placeholder="000.000.000-00" keyboardType="numeric" maxLength={14} erro={erros.cpf} />
              <Campo label="Data de nascimento *" valor={dados.dataNasc} onChange={(v) => atualizar('dataNasc', mascararData(v))} placeholder="DD/MM/AAAA" keyboardType="numeric" maxLength={10} erro={erros.dataNasc} />
              <Campo label="Nome da mãe *" valor={dados.nomeMae} onChange={(v) => atualizar('nomeMae', v)} placeholder="Ex: Ana Souza" erro={erros.nomeMae} />
            </View>
          )}

          {/* ── Etapa 1: Contato ────────────────────────────────── */}
          {etapa === 1 && (
            <View>
              <Campo label="E-mail *" valor={dados.email} onChange={(v) => atualizar('email', v)} placeholder="seuemail@exemplo.com" keyboardType="email-address" erro={erros.email} />
              <Campo label="Telefone / WhatsApp *" valor={dados.telefone} onChange={(v) => atualizar('telefone', mascararTelefone(v))} placeholder="(00) 00000-0000" keyboardType="phone-pad" maxLength={15} erro={erros.telefone} />
            </View>
          )}

          {/* ── Etapa 2: Endereço ───────────────────────────────── */}
          {etapa === 2 && (
            <View>
              <Campo label="CEP *" valor={dados.cep} onChange={(v) => atualizar('cep', mascararCEP(v))} placeholder="00000-000" keyboardType="numeric" maxLength={9} erro={erros.cep} />
              <Campo label="Logradouro *" valor={dados.logradouro} onChange={(v) => atualizar('logradouro', v)} placeholder="Rua, Avenida..." erro={erros.logradouro} />
              <View style={styles.duplo}>
                <View style={{ flex: 1 }}>
                  <Campo label="Número *" valor={dados.numero} onChange={(v) => atualizar('numero', v)} placeholder="123" keyboardType="numeric" erro={erros.numero} />
                </View>
                <View style={{ width: 12 }} />
                <View style={{ flex: 2 }}>
                  <Campo label="Complemento" valor={dados.complemento} onChange={(v) => atualizar('complemento', v)} placeholder="Apto, Bloco..." />
                </View>
              </View>
              <Campo label="Bairro *" valor={dados.bairro} onChange={(v) => atualizar('bairro', v)} placeholder="Ex: Centro" erro={erros.bairro} />
              <View style={styles.duplo}>
                <View style={{ flex: 3 }}>
                  <Campo label="Cidade *" valor={dados.cidade} onChange={(v) => atualizar('cidade', v)} placeholder="Ex: São Paulo" erro={erros.cidade} />
                </View>
                <View style={{ width: 12 }} />
                <View style={{ flex: 1 }}>
                  <Campo label="UF *" valor={dados.uf} onChange={(v) => atualizar('uf', v.toUpperCase().slice(0,2))} placeholder="SP" maxLength={2} erro={erros.uf} />
                </View>
              </View>
            </View>
          )}

          {/* ── Etapa 3: Tipo de Conta ──────────────────────────── */}
          {etapa === 3 && (
            <View>
              <Text style={styles.secaoLabel}>Escolha o tipo de conta</Text>
              {[
                { id: 'Conta Corrente',  icone: '💳', desc: 'Para uso diário, pagamentos e transferências' },
                { id: 'Conta Poupança',  icone: '🐷', desc: 'Rendimento automático sobre o saldo' },
                { id: 'Conta Salário',   icone: '💼', desc: 'Exclusiva para recebimento de salário' },
                { id: 'Conta Universitária', icone: '🎓', desc: 'Sem tarifas para estudantes universitários' },
              ].map((op) => (
                <OpcaoConta key={op.id} titulo={op.id} descricao={op.desc} icone={op.icone} selecionado={dados.tipoConta === op.id} onPress={() => atualizar('tipoConta', op.id)} />
              ))}

              <Text style={[styles.secaoLabel, { marginTop: 20 }]}>Serviços adicionais</Text>
              {[
                { campo: 'semTarifa',     label: 'Conta sem tarifas (primeiros 12 meses)' },
                { campo: 'cartaoCredito', label: 'Solicitar cartão de crédito' },
                { campo: 'investimentos', label: 'Habilitar módulo de investimentos' },
              ].map((s) => (
                <View key={s.campo} style={styles.switchRow}>
                  <Text style={styles.switchLabel}>{s.label}</Text>
                  <Switch
                    value={dados[s.campo]}
                    onValueChange={(v) => atualizar(s.campo, v)}
                    trackColor={{ false: '#ddd', true: '#a5d6a7' }}
                    thumbColor={dados[s.campo] ? '#2e7d32' : '#f4f3f4'}
                  />
                </View>
              ))}
            </View>
          )}

          {/* ── Etapa 4: Confirmação ────────────────────────────── */}
          {etapa === 4 && (
            <View>
              <View style={styles.resumoCard}>
                <Text style={styles.resumoTitulo}>Revise seus dados</Text>
                {[
                  ['Nome',          dados.nome],
                  ['CPF',           dados.cpf],
                  ['Nascimento',    dados.dataNasc],
                  ['E-mail',        dados.email],
                  ['Telefone',      dados.telefone],
                  ['Endereço',      `${dados.logradouro}, ${dados.numero} — ${dados.bairro}`],
                  ['Cidade / UF',   `${dados.cidade} / ${dados.uf}`],
                  ['Tipo de conta', dados.tipoConta],
                ].map(([k, v]) => (
                  <View key={k} style={styles.resumoLinha}>
                    <Text style={styles.resumoChave}>{k}</Text>
                    <Text style={styles.resumoValor}>{v}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.termosRow}
                onPress={() => atualizar('termos', !dados.termos)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, dados.termos && styles.checkboxMarcado]}>
                  {dados.termos && <Text style={styles.checkboxTick}>✓</Text>}
                </View>
                <Text style={styles.termosTexto}>
                  Li e aceito os{' '}
                  <Text style={styles.termosLink}>Termos de Uso</Text> e a{' '}
                  <Text style={styles.termosLink}>Política de Privacidade</Text>
                </Text>
              </TouchableOpacity>
              {erros.termos ? <Text style={styles.erroTexto}>{erros.termos}</Text> : null}
            </View>
          )}

          {/* ── Botões de navegação ─────────────────────────────── */}
          <View style={styles.botoesRow}>
            {etapa > 0 && (
              <TouchableOpacity style={styles.btnVoltar} onPress={voltar}>
                <Text style={styles.btnVoltarTexto}>← Voltar</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.btnAvancar, etapa === 0 && { flex: 1 }]}
              onPress={etapa < ETAPAS.length - 1 ? avancar : enviar}
            >
              <Text style={styles.btnAvancarTexto}>
                {etapa < ETAPAS.length - 1 ? 'Continuar →' : 'Abrir conta ✓'}
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f8f2' },

  // Header
  header: { backgroundColor: '#1b5e20', paddingHorizontal: 20, paddingTop: 18, paddingBottom: 16 },
  headerTitulo: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  headerSubtitulo: { fontSize: 12, color: '#a5d6a7', marginTop: 2 },

  // Indicador de etapas
  indicadorWrap: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 4 },
  bolinha: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#c8e6c9', alignItems: 'center', justifyContent: 'center' },
  bolinhaAtiva: { backgroundColor: '#2e7d32' },
  bolinhaFeita: { backgroundColor: '#388e3c' },
  bolinhaNum: { fontSize: 11, fontWeight: 'bold', color: '#888' },
  bolinhaNumAtiva: { color: '#fff' },
  linha: { flex: 1, height: 2, backgroundColor: '#c8e6c9' },
  linhaFeita: { backgroundColor: '#388e3c' },
  etapaNome: { fontSize: 13, fontWeight: '600', color: '#2e7d32', paddingHorizontal: 20, marginBottom: 4, marginTop: 6 },

  // Formulário
  formScroll: { padding: 16, paddingBottom: 36 },

  // Campo
  campoWrap: { marginBottom: 14 },
  campoLabel: { fontSize: 13, fontWeight: '500', color: '#444', marginBottom: 5 },
  input: { height: 48, borderWidth: 1.5, borderColor: '#c8e6c9', borderRadius: 10, paddingHorizontal: 14, fontSize: 15, color: '#222', backgroundColor: '#fff' },
  inputErro: { borderColor: '#e53935' },
  erroTexto: { fontSize: 11, color: '#e53935', marginTop: 3, marginLeft: 2 },

  duplo: { flexDirection: 'row' },

  // Tipo de conta
  secaoLabel: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 10 },
  opcaoConta: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#c8e6c9', borderRadius: 12, padding: 12, marginBottom: 10, gap: 10 },
  opcaoContaSelecionada: { borderColor: '#2e7d32', backgroundColor: '#f1f8f2' },
  opcaoIcone: { fontSize: 24 },
  opcaoTitulo: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 2 },
  opcaoTituloSelecionado: { color: '#1b5e20' },
  opcaoDescricao: { fontSize: 11, color: '#888' },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#ccc', alignItems: 'center', justifyContent: 'center' },
  radioSelecionado: { borderColor: '#2e7d32' },
  radioPonto: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#2e7d32' },

  // Switch
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: '#e0f2e1' },
  switchLabel: { flex: 1, fontSize: 13, color: '#444', marginRight: 8 },

  // Resumo
  resumoCard: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#c8e6c9' },
  resumoTitulo: { fontSize: 14, fontWeight: 'bold', color: '#1b5e20', marginBottom: 12 },
  resumoLinha: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7, borderBottomWidth: 0.5, borderBottomColor: '#e8f5e9' },
  resumoChave: { fontSize: 12, color: '#888', flex: 1 },
  resumoValor: { fontSize: 12, color: '#222', fontWeight: '500', flex: 2, textAlign: 'right' },

  // Termos
  termosRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 6 },
  checkbox: { width: 22, height: 22, borderWidth: 2, borderColor: '#aaa', borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  checkboxMarcado: { backgroundColor: '#2e7d32', borderColor: '#2e7d32' },
  checkboxTick: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  termosTexto: { flex: 1, fontSize: 13, color: '#555', lineHeight: 20 },
  termosLink: { color: '#2e7d32', fontWeight: '600' },

  // Botões
  botoesRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  btnVoltar: { flex: 1, borderWidth: 1.5, borderColor: '#a5d6a7', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  btnVoltarTexto: { fontSize: 14, color: '#388e3c', fontWeight: '500' },
  btnAvancar: { flex: 2, backgroundColor: '#2e7d32', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  btnAvancarTexto: { fontSize: 15, color: '#fff', fontWeight: 'bold' },

  // Sucesso
  sucessoScroll: { padding: 24, paddingBottom: 40, alignItems: 'center' },
  sucessoIconeWrap: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#e8f5e9', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  sucessoIcone: { fontSize: 40 },
  sucessoTitulo: { fontSize: 22, fontWeight: 'bold', color: '#1b5e20', textAlign: 'center', marginBottom: 10 },
  sucessoSubtitulo: { fontSize: 14, color: '#555', textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  btnNovaConta: { marginTop: 10, borderWidth: 1.5, borderColor: '#2e7d32', borderRadius: 12, paddingVertical: 13, paddingHorizontal: 30 },
  btnNovaContaTexto: { color: '#2e7d32', fontSize: 14, fontWeight: '600' },
});
