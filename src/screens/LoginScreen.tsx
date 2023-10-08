import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Button, 
  Alert, 
  StyleSheet, 
  TextInput 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const LoginScreen = ({ route }) => {
  const navigation = useNavigation();
  const rnBiometrics = new ReactNativeBiometrics();

  const [password, setPassword] = useState('password');

  const handleLogin = () => {
    if (password === 'password') {
      navigation.navigate('ViewNoteScreen', route.params);
    } else {
      Alert.alert('Invalid username or password');
    }
  };

  const authenticate = async () => {
    try {
      const { biometryType } = await rnBiometrics.isSensorAvailable()

      if (biometryType === BiometryTypes.TouchID || biometryType === BiometryTypes.FaceID || biometryType === BiometryTypes.Biometrics) {
        const result = await rnBiometrics.simplePrompt({
          promptMessage: 'Authenticate to access your notes',
        });

        if (result.success) {
          navigation.navigate('ViewNoteScreen');
        } else {
          Alert.alert('Authentication failed');
        }
      } else {
        Alert.alert('Biometric authentication not available on this device');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter password"
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Authenticate" onPress={authenticate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: 'snow',
  },
});

export default LoginScreen;
