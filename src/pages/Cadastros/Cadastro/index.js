import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Cadastro() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirma, setSenhaConfirma] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  }

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
  }

  function validarCadastro() {

    if (senha === senhaConfirma && senha !== '' && senhaConfirma !== '' && email !== '') {
      if (validarEmail(email)) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, senha)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            
            // ...
            setModalVisible(true);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      } else {
        alert('Formato de email inválido');
      }
    } else {
      if (senha !== senhaConfirma && email !== '') {
        alert('Senhas não coincidem');
      } else {
        alert('Campos obrigatórios não preenchidos');
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoTop}>
        <Image source={require('../../../img/logo.png')} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputEmail}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
        />
        <TextInput
          style={styles.inputSenha}
          secureTextEntry={true}
          value={senha}
          onChangeText={(text) => setSenha(text)}
          placeholder="Senha"
        />
        <TextInput
          style={styles.inputSenhaConfirma}
          secureTextEntry={true}
          value={senhaConfirma}
          onChangeText={(text) => setSenhaConfirma(text)}
          placeholder="Confirmar senha"
        />
      </View>

      <TouchableOpacity
        style={styles.logar}
        onPress={validarCadastro}>
        <Text style={styles.logarText}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={{ alignSelf: 'center', fontSize: 18 }}>Já possui conta?</Text>
      <TouchableOpacity
        style={{ alignSelf: 'center' }}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={{ fontSize: 18 }}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.copy}>
          Copyright © 2023 Data Explores {'\n'}
          todos direitos reservados
        </Text>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType='slide'
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderTitle}>Aviso</Text>
            <TouchableOpacity
              style={styles.modalHeaderClose}
              onPress={() => setModalVisible(!modalVisible)} >
              <Image source={require('../../../img/close.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.modalContentTitle}>
              Seleciona o cadastro que deseja seguir
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('CadastroCliente')}
              style={styles.modalBtn}>
              <Text style={styles.modalContent}>
                Cliente
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('CadastroEntregador')}
              style={styles.modalBtn}>
              <Text style={styles.modalContent}>
                Entregador
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('CadastroEmpresa')}
              style={styles.modalBtn}>
              <Text style={styles.modalContent}>
                Empresa
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '15%',
    backgroundColor: '#f2f2f2',
  },
  logoTop: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
  },
  inputEmail: {
    fontSize: 18,
    padding: 5,
    paddingLeft: 15,
    margin: 5,
    marginLeft: 15,
    width: 300,
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  inputSenha: {
    fontSize: 18,
    padding: 5,
    paddingLeft: 15,
    margin: 5,
    marginLeft: 15,
    width: 300,
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  inputSenhaConfirma: {
    fontSize: 18,
    padding: 5,
    paddingLeft: 15,
    margin: 5,
    marginLeft: 15,
    width: 300,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  logar: {
    height: 50,
    width: 250,
    alignSelf: 'center',
    backgroundColor: '#ffc000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 15
  },
  logarText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flex: 1,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 15
  },
  copy: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 15
  },
  modalContainer: {
    alignSelf: 'center',
    marginTop: '50%',
    width: 300,
    backgroundColor: '#f2f2f2',
    margin: 20,
    borderRadius: 20,
    height: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 50
  },
  modalHeader: {
    backgroundColor: '#ffc000',
    width: '100%',
    height: 40,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  modalHeaderTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#121212',
    textAlign: 'center',
  },
  modalHeaderClose: {
    justifyContent: 'flex-end',
  },
  modalContentTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 50
  },
  modalContent: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#121212'
  },
  modalBtn: {
    width: 200,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffc000',
    padding: 5,
    marginBottom: 20,
    alignSelf: 'center'
  }
});
