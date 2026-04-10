import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const vagas = [
  {
    id: 1,
    titulo: 'Desenvolvedor Front-End',
    empresa: 'TechSolutions Ltda',
    local: 'São Paulo, SP',
    tipo: 'CLT',
    salario: 'R$ 5.000 – R$ 8.000',
    nivel: 'Pleno',
    tecnologias: ['React', 'JavaScript', 'CSS'],
    descricao:
      'Buscamos um desenvolvedor Front-End para criar interfaces modernas e responsivas. Trabalho híbrido, 2x por semana presencial.',
    cor: '#1565c0',
  },
  {
    id: 2,
    titulo: 'Desenvolvedor Back-End',
    empresa: 'Inovação Digital S.A.',
    local: 'Remoto',
    tipo: 'PJ',
    salario: 'R$ 8.000 – R$ 12.000',
    nivel: 'Sênior',
    tecnologias: ['Node.js', 'Python', 'PostgreSQL'],
    descricao:
      'Vaga para back-end sênior em startup de fintech. Responsável por APIs REST e microsserviços em ambiente cloud.',
    cor: '#6a1b9a',
  },
  {
    id: 3,
    titulo: 'Analista de Dados',
    empresa: 'DataMind Corp',
    local: 'Rio de Janeiro, RJ',
    tipo: 'CLT',
    salario: 'R$ 6.500 – R$ 9.500',
    nivel: 'Pleno',
    tecnologias: ['Python', 'Power BI', 'SQL'],
    descricao:
      'Análise de grandes volumes de dados, criação de dashboards e relatórios gerenciais para tomada de decisão.',
    cor: '#00695c',
  },
  {
    id: 4,
    titulo: 'UX/UI Designer',
    empresa: 'Creative Apps',
    local: 'Remoto',
    tipo: 'Freelancer',
    salario: 'R$ 4.500 – R$ 7.000',
    nivel: 'Júnior',
    tecnologias: ['Figma', 'Adobe XD', 'Sketch'],
    descricao:
      'Design de interfaces para aplicativos mobile e web. Portfolio obrigatório. Projetos variados com equipe multidisciplinar.',
    cor: '#c62828',
  },
  {
    id: 5,
    titulo: 'DevOps Engineer',
    empresa: 'CloudTech Brasil',
    local: 'Curitiba, PR',
    tipo: 'CLT',
    salario: 'R$ 10.000 – R$ 15.000',
    nivel: 'Sênior',
    tecnologias: ['Docker', 'Kubernetes', 'AWS'],
    descricao:
      'Gerenciamento de infraestrutura cloud, pipelines CI/CD e automação de deploys para produtos com milhões de usuários.',
    cor: '#e65100',
  },
  {
    id: 6,
    titulo: 'Desenvolvedor Mobile',
    empresa: 'AppFactory',
    local: 'Remoto',
    tipo: 'PJ',
    salario: 'R$ 7.000 – R$ 11.000',
    nivel: 'Pleno',
    tecnologias: ['React Native', 'Flutter', 'Firebase'],
    descricao:
      'Desenvolvimento de aplicativos iOS e Android com React Native. Experiência com publicação nas lojas é diferencial.',
    cor: '#2e7d32',
  },
  {
    id: 7,
    titulo: 'Analista de Cibersegurança',
    empresa: 'SecureNet',
    local: 'Brasília, DF',
    tipo: 'CLT',
    salario: 'R$ 9.000 – R$ 14.000',
    nivel: 'Sênior',
    tecnologias: ['Pentest', 'SIEM', 'ISO 27001'],
    descricao:
      'Monitoramento de ameaças, análise de vulnerabilidades e resposta a incidentes de segurança em ambiente corporativo.',
    cor: '#37474f',
  },
  {
    id: 8,
    titulo: 'Scrum Master',
    empresa: 'Agile Works',
    local: 'Porto Alegre, RS',
    tipo: 'CLT',
    salario: 'R$ 7.500 – R$ 10.000',
    nivel: 'Pleno',
    tecnologias: ['Scrum', 'Jira', 'Kanban'],
    descricao:
      'Facilitar cerimônias ágeis, remover impedimentos e promover cultura de melhoria contínua em times de tecnologia.',
    cor: '#f57f17',
  },
];

const nivelCor = {
  Júnior: { bg: '#e3f2fd', text: '#1565c0' },
  Pleno: { bg: '#e8f5e9', text: '#2e7d32' },
  Sênior: { bg: '#fce4ec', text: '#c62828' },
};

const tipoCor = {
  CLT: { bg: '#ede7f6', text: '#4527a0' },
  PJ: { bg: '#fff3e0', text: '#e65100' },
  Freelancer: { bg: '#e0f2f1', text: '#00695c' },
};

export default function App() {
  const [vagaSelecionada, setVagaSelecionada] = useState(null);

  if (vagaSelecionada) {
    const v = vagaSelecionada;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={v.cor} />
        <View style={[styles.detalheHeader, { backgroundColor: v.cor }]}>
          <TouchableOpacity onPress={() => setVagaSelecionada(null)} style={styles.voltarBtn}>
            <Text style={styles.voltarTexto}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.detalheTitulo}>{v.titulo}</Text>
          <Text style={styles.detalheEmpresa}>{v.empresa}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.detalheScroll}>
          <View style={styles.detalheInfoRow}>
            <Text style={styles.detalheInfoIcon}>📍</Text>
            <Text style={styles.detalheInfoTexto}>{v.local}</Text>
          </View>
          <View style={styles.detalheInfoRow}>
            <Text style={styles.detalheInfoIcon}>💰</Text>
            <Text style={styles.detalheInfoTexto}>{v.salario}</Text>
          </View>

          <View style={styles.detalheBadgeRow}>
            <View style={[styles.badge, { backgroundColor: nivelCor[v.nivel].bg }]}>
              <Text style={[styles.badgeTexto, { color: nivelCor[v.nivel].text }]}>{v.nivel}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: tipoCor[v.tipo].bg }]}>
              <Text style={[styles.badgeTexto, { color: tipoCor[v.tipo].text }]}>{v.tipo}</Text>
            </View>
          </View>

          <Text style={styles.detalheSecao}>Descrição</Text>
          <Text style={styles.detalheDescricao}>{v.descricao}</Text>

          <Text style={styles.detalheSecao}>Tecnologias</Text>
          <View style={styles.tecRow}>
            {v.tecnologias.map((tec) => (
              <View key={tec} style={[styles.tecBadge, { borderColor: v.cor }]}>
                <Text style={[styles.tecTexto, { color: v.cor }]}>{tec}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={[styles.candidatarBtn, { backgroundColor: v.cor }]}>
            <Text style={styles.candidatarTexto}>Candidatar-se</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a237e" />

      <View style={styles.header}>
        <Text style={styles.headerTitulo}>💼 Vagas de TI</Text>
        <Text style={styles.headerSubtitulo}>{vagas.length} oportunidades disponíveis</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      >
        {vagas.map((vaga) => (
          <TouchableOpacity
            key={vaga.id}
            style={styles.card}
            onPress={() => setVagaSelecionada(vaga)}
            activeOpacity={0.85}
          >
            <View style={[styles.cardFaixa, { backgroundColor: vaga.cor }]} />
            <View style={styles.cardConteudo}>
              <Text style={styles.cardTitulo}>{vaga.titulo}</Text>
              <Text style={styles.cardEmpresa}>{vaga.empresa}</Text>

              <View style={styles.cardInfoRow}>
                <Text style={styles.cardInfoTexto}>📍 {vaga.local}</Text>
                <Text style={styles.cardInfoTexto}>💰 {vaga.salario}</Text>
              </View>

              <View style={styles.cardBadgeRow}>
                <View style={[styles.badge, { backgroundColor: nivelCor[vaga.nivel].bg }]}>
                  <Text style={[styles.badgeTexto, { color: nivelCor[vaga.nivel].text }]}>
                    {vaga.nivel}
                  </Text>
                </View>
                <View style={[styles.badge, { backgroundColor: tipoCor[vaga.tipo].bg }]}>
                  <Text style={[styles.badgeTexto, { color: tipoCor[vaga.tipo].text }]}>
                    {vaga.tipo}
                  </Text>
                </View>
              </View>

              <View style={styles.tecRow}>
                {vaga.tecnologias.map((tec) => (
                  <View key={tec} style={[styles.tecBadge, { borderColor: vaga.cor }]}>
                    <Text style={[styles.tecTexto, { color: vaga.cor }]}>{tec}</Text>
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.rodape}>— Fim das vagas disponíveis —</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f8',
  },

  // Header
  header: {
    backgroundColor: '#1a237e',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,
  },
  headerTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitulo: {
    fontSize: 13,
    color: '#c5cae9',
    marginTop: 2,
  },

  // Lista
  lista: {
    padding: 16,
    paddingBottom: 30,
  },

  // Card
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  cardFaixa: {
    width: 6,
  },
  cardConteudo: {
    flex: 1,
    padding: 14,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  cardEmpresa: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
  },
  cardInfoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  cardInfoTexto: {
    fontSize: 12,
    color: '#666',
  },
  cardBadgeRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },

  // Badges
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeTexto: {
    fontSize: 11,
    fontWeight: '600',
  },

  // Tecnologias
  tecRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tecBadge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tecTexto: {
    fontSize: 11,
    fontWeight: '500',
  },

  rodape: {
    textAlign: 'center',
    fontSize: 12,
    color: '#aaa',
    marginTop: 8,
  },

  // Tela de detalhe
  detalheHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  voltarBtn: {
    marginBottom: 12,
  },
  voltarTexto: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
  },
  detalheTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  detalheEmpresa: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  detalheScroll: {
    padding: 20,
    paddingBottom: 40,
  },
  detalheInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detalheInfoIcon: {
    fontSize: 15,
    marginRight: 8,
  },
  detalheInfoTexto: {
    fontSize: 14,
    color: '#333',
  },
  detalheBadgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 14,
  },
  detalheSecao: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginTop: 16,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#1a237e',
    paddingLeft: 10,
  },
  detalheDescricao: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
  candidatarBtn: {
    marginTop: 30,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  candidatarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
