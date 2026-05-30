import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function TelaPersonal() {
  const [nome, setNome] = useState('João Silva');
  const [email, setEmail] = useState('joao.silva@email.com');
  const [telefone, setTelefone] = useState('(11) 98765-4321');
  const [editando, setEditando] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.perfilHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/120?text=Foto' }}
          style={styles.fotoPerfil}
        />
        <Text style={styles.nomePerfil}>{nome}</Text>
        <Text style={styles.emailPerfil}>{email}</Text>
      </View>

      <View style={styles.secao}>
        <Text style={styles.titulo}>Dados Pessoais</Text>

        {editando ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              value={telefone}
              onChangeText={setTelefone}
            />
            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={() => setEditando(false)}
            >
              <Text style={styles.textoSalvar}>Salvar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Nome:</Text>
              <Text style={styles.valor}>{nome}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.valor}>{email}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Telefone:</Text>
              <Text style={styles.valor}>{telefone}</Text>
            </View>
            <TouchableOpacity
              style={styles.botaoEditar}
              onPress={() => setEditando(true)}
            >
              <Text style={styles.textoEditar}>Editar Perfil</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

function TelaFormacao() {
  const [formacoes] = useState([
    {
      id: '1',
      titulo: 'Bacharel em Ciência da Computação',
      instituicao: 'Universidade Federal do Brasil',
      ano: '2018',
    },
    {
      id: '2',
      titulo: 'Especialização em DevOps',
      instituicao: 'Instituto Tecnológico Avançado',
      ano: '2020',
    },
    {
      id: '3',
      titulo: 'Certificação AWS Solutions Architect',
      instituicao: 'Amazon Web Services',
      ano: '2021',
    },
  ]);

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.titulo, styles.tituloPagina]}>Formação</Text>

      {formacoes.map((formacao) => (
        <View key={formacao.id} style={styles.cardFormacao}>
          <Text style={styles.tituloFormacao}>{formacao.titulo}</Text>
          <Text style={styles.instituicao}>{formacao.instituicao}</Text>
          <Text style={styles.ano}>{formacao.ano}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function TelaExperiencia() {
  const [experiencias] = useState([
    {
      id: '1',
      cargo: 'Senior Developer',
      empresa: 'Tech Solutions Inc',
      periodo: '2022 - Atual',
      descricao: 'Desenvolvimento de aplicações em Node.js e React',
    },
    {
      id: '2',
      cargo: 'Full Stack Developer',
      empresa: 'Web Dynamics',
      periodo: '2020 - 2022',
      descricao: 'Desenvolvedor full stack com foco em arquitetura de APIs',
    },
    {
      id: '3',
      cargo: 'Junior Developer',
      empresa: 'StartUp Solutions',
      periodo: '2018 - 2020',
      descricao: 'Desenvolvimento web frontend e backend',
    },
  ]);

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.titulo, styles.tituloPagina]}>Experiência</Text>

      {experiencias.map((exp) => (
        <View key={exp.id} style={styles.cardExperiencia}>
          <Text style={styles.cargo}>{exp.cargo}</Text>
          <Text style={styles.empresa}>{exp.empresa}</Text>
          <Text style={styles.periodo}>{exp.periodo}</Text>
          <Text style={styles.descricaoExp}>{exp.descricao}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default function MyProfileApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarLabel: route.name,
          tabBarActiveTintColor: '#3498db',
          tabBarInactiveTintColor: '#95a5a6',
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          headerStyle: styles.header,
          headerTintColor: '#fff',
          headerTitleStyle: styles.headerTitle,
        })}
      >
        <Tab.Screen
          name="Pessoal"
          component={TelaPersonal}
          options={{
            title: 'App 16 - Meu Perfil',
            tabBarLabel: 'Pessoal',
          }}
        />
        <Tab.Screen
          name="Formacao"
          component={TelaFormacao}
          options={{
            title: 'Formação',
            tabBarLabel: 'Formação',
          }}
        />
        <Tab.Screen
          name="Experiencia"
          component={TelaExperiencia}
          options={{
            title: 'Experiência',
            tabBarLabel: 'Experiência',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  perfilHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  fotoPerfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e8e8e8',
    marginBottom: 15,
  },
  nomePerfil: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  emailPerfil: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  secao: {
    padding: 15,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  tituloPagina: {
    padding: 15,
    color: '#e74c3c',
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 6,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  valor: {
    fontSize: 15,
    color: '#2c3e50',
    fontWeight: '600',
  },
  botaoEditar: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoSalvar: {
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  textoEditar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  textoSalvar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardFormacao: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f39c12',
  },
  tituloFormacao: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 6,
  },
  instituicao: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 4,
    fontWeight: '600',
  },
  ano: {
    fontSize: 12,
    color: '#95a5a6',
  },
  cardExperiencia: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  cargo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 6,
  },
  empresa: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 4,
    fontWeight: '600',
  },
  periodo: {
    fontSize: 12,
    color: '#95a5a6',
    marginBottom: 8,
  },
  descricaoExp: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  tabBar: {
    backgroundColor: '#fff',
    borderTopColor: '#ecf0f1',
    borderTopWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#3498db',
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
