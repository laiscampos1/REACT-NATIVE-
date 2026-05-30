import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function CurrencyConverter() {
  const [valor, setValor] = useState('');
  const [moedaDe, setMoedaDe] = useState('USD');
  const [moedaPara, setMoedaPara] = useState('BRL');
  const [resultado, setResultado] = useState('');

  // Taxas de câmbio (você pode atualizar com valores reais)
  const taxas = {
    USD: { BRL: 5.15, EUR: 0.92 },
    BRL: { USD: 0.19, EUR: 0.18 },
    EUR: { USD: 1.09, BRL: 5.61 },
  };

  const converter = () => {
    if (!valor || isNaN(valor)) {
      setResultado('Valor inválido');
      return;
    }

    const taxa = taxas[moedaDe][moedaPara];
    const resultadoConversao = (parseFloat(valor) * taxa).toFixed(2);
    setResultado(`${resultadoConversao} ${moedaPara}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Conversor de Moedas</Text>
      <Text style={styles.subtitulo}>Dólar, Real e Euro</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o valor"
          keyboardType="decimal-pad"
          value={valor}
          onChangeText={setValor}
        />
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>De:</Text>
        <Picker
          selectedValue={moedaDe}
          style={styles.picker}
          onValueChange={(itemValue) => setMoedaDe(itemValue)}
        >
          <Picker.Item label="Dólar (USD)" value="USD" />
          <Picker.Item label="Real (BRL)" value="BRL" />
          <Picker.Item label="Euro (EUR)" value="EUR" />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Para:</Text>
        <Picker
          selectedValue={moedaPara}
          style={styles.picker}
          onValueChange={(itemValue) => setMoedaPara(itemValue)}
        >
          <Picker.Item label="Dólar (USD)" value="USD" />
          <Picker.Item label="Real (BRL)" value="BRL" />
          <Picker.Item label="Euro (EUR)" value="EUR" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.botao} onPress={converter}>
        <Text style={styles.textoBotao}>Converter</Text>
      </TouchableOpacity>

      {resultado !== '' && (
        <Text style={styles.resultado}>{resultado}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: '#e74c3c',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  botao: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultado: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
    textAlign: 'center',
    marginTop: 20,
  },
});
