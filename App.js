import React, { useRef } from 'react';
import {
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import { useField, FormProvider } from 'informed';


const InformedTextInput = (props) => {

  const { fieldState, fieldApi, render, ref, userProps } = useField({ ...props });

  return (
    <>
      <TextInput
        placeholder="Type Here"
        style={styles.textInput}
        multiline={true}
        onBlur={() => {
          fieldApi.setTouched(true);
          Keyboard.dismiss();
        }}
        onChangeText={(text) => fieldApi.setValue(text)}
        value={fieldState.value} />
      {fieldState.error ? (
        <Text style={{ color: 'green' }}>{fieldState.error}</Text>
      ) : null}
    </>
  );


};


const validate = value => {
  return !value || value.length < 5
    ? 'Field must be at least five characters'
    : undefined;
};


export default function App() {

  const apiRef = useRef();

  return (
    <View style={styles.container}>
      <FormProvider apiRef={apiRef} onSubmit={(vals) => console.log('VALS', vals)}>
        <View style={styles.inputContainer}>
          <InformedTextInput
            field="name"
            validate={validate}
            validateOnBlur
            initialValue="foobar" />
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={apiRef.current && apiRef.current.submitForm}
              style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </FormProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  }
});
