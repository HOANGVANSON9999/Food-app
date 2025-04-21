import { StyleSheet } from 'react-native';


 export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fffaf3',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#ff6347',
      marginBottom: 30,
    },
    inputContainer: {
      width: '100%',
      backgroundColor: '#fff',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      marginBottom: 16,
    },
    iconLeft: {
      marginRight: 10,
    },
    inputField: {
      flex: 1,
      fontSize: 16,
      paddingVertical: 12,
      color: '#000',
    },
    button: {
      backgroundColor: '#ff6347',
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 10,
      width: '100%',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 17,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    linkText: {
      color: '#555',
      marginTop: 16,
      textDecorationLine: 'underline',
    },
  });
