import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

export default function App() {
  const [precoCombustivel, setPrecoCombustivel] = useState('');
  const [precoAlcool, setPrecoAlcool] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const gasolina = parseFloat(precoCombustivel.replace(',', '.'));
    const alcool = parseFloat(precoAlcool.replace(',', '.'));

    if (isNaN(gasolina) || isNaN(alcool) || gasolina <= 0 || alcool <= 0) {
      setResultado({ tipo: 'erro', mensagem: 'Preencha os dois campos com valores válidos.' });
      return;
    }

    const razao = alcool / gasolina;

    if (razao < 0.7) {
      setResultado({
        tipo: 'alcool',
        mensagem: 'Vale a pena abastecer com ÁLCOOL!',
        detalhe: `A razão é ${razao.toFixed(2)} (menor que 0,70)`,
        emoji: '🌿',
        cor: '#2e7d32',
        corFundo: '#e8f5e9',
      });
    } else {
      setResultado({
        tipo: 'gasolina',
        mensagem: 'Vale a pena abastecer com GASOLINA!',
        detalhe: `A razão é ${razao.toFixed(2)} (maior ou igual a 0,70)`,
        emoji: '⛽',
        cor: '#e65100',
        corFundo: '#fff3e0',
      });
    }
  };

  const limpar = () => {
    setPrecoCombustivel('');
    setPrecoAlcool('');
    setResultado(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a237e" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll}>

          {/* Cabeçalho */}
          <View style={styles.header}>
            <Text style={styles.headerEmoji}>⛽ 🌿</Text>
            <Text style={styles.headerTitulo}>Álcool ou Gasolina?</Text>
            <Text style={styles.headerSubtitulo}>
              Descubra qual combustível compensa mais
            </Text>
          </View>

          {/* Card de inputs */}
          <View style={styles.card}>

            <Text style={styles.label}>Preço da Gasolina (R$)</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputPrefix}>R$</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 5,89"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                value={precoCombustivel}
                onChangeText={setPrecoCombustivel}
              />
            </View>

            <Text style={[styles.label, { marginTop: 16 }]}>Preço do Álcool (R$)</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputPrefix}>R$</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 3,99"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                value={precoAlcool}
                onChangeText={setPrecoAlcool}
              />
            </View>

            <TouchableOpacity style={styles.botaoCalcular} onPress={calcular}>
              <Text style={styles.botaoTexto}>Calcular</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoLimpar} onPress={limpar}>
              <Text style={styles.botaoLimparTexto}>Limpar</Text>
            </TouchableOpacity>
          </View>

          {/* Resultado */}
          {resultado && (
            <View
              style={[
                styles.resultadoCard,
                {
                  backgroundColor:
                    resultado.tipo === 'erro' ? '#ffebee' : resultado.corFundo,
                  borderColor:
                    resultado.tipo === 'erro' ? '#c62828' : resultado.cor,
                },
              ]}
            >
              {resultado.tipo !== 'erro' && (
                <Text style={styles.resultadoEmoji}>{resultado.emoji}</Text>
              )}
              <Text
                style={[
                  styles.resultadoMensagem,
                  {
                    color: resultado.tipo === 'erro' ? '#c62828' : resultado.cor,
                  },
                ]}
              >
                {resultado.mensagem}
              </Text>
              {resultado.detalhe && (
                <Text style={styles.resultadoDetalhe}>{resultado.detalhe}</Text>
              )}
            </View>
          )}

          {/* Dica */}
          <View style={styles.dica}>
            <Text style={styles.dicaTitulo}>Como funciona?</Text>
            <Text style={styles.dicaTexto}>
              Divida o preço do álcool pelo preço da gasolina.{'\n'}
              {'  '}• Resultado {'<'} 0,70 → use <Text style={{ fontWeight: 'bold', color: '#2e7d32' }}>álcool</Text>{'\n'}
              {'  '}• Resultado ≥ 0,70 → use <Text style={{ fontWeight: 'bold', color: '#e65100' }}>gasolina</Text>
            </Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },

  // Header
  header: {
    alignItems: 'center',
    backgroundColor: '#1a237e',
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  headerTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitulo: {
    fontSize: 14,
    color: '#c5cae9',
    textAlign: 'center',
  },

  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#c5cae9',
    borderRadius: 10,
    backgroundColor: '#f8f9ff',
    paddingHorizontal: 12,
    height: 48,
  },
  inputPrefix: {
    fontSize: 16,
    color: '#777',
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },

  // Botões
  botaoCalcular: {
    backgroundColor: '#1a237e',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  botaoLimpar: {
    borderWidth: 1.5,
    borderColor: '#c5cae9',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoLimparTexto: {
    color: '#888',
    fontSize: 15,
  },

  // Resultado
  resultadoCard: {
    borderRadius: 16,
    borderWidth: 2,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  resultadoEmoji: {
    fontSize: 44,
    marginBottom: 10,
  },
  resultadoMensagem: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  resultadoDetalhe: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },

  // Dica
  dica: {
    backgroundColor: '#e8eaf6',
    borderRadius: 12,
    padding: 16,
  },
  dicaTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 6,
  },
  dicaTexto: {
    fontSize: 13,
    color: '#444',
    lineHeight: 22,
  },
});
