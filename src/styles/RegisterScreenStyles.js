import { StyleSheet } from 'react-native';



export const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#fffaf3',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    title: {
      fontSize: 28,
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
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconLeft: {
      marginRight: 10,
    },
    inputField: {
      flex: 1,
      fontSize: 16,
      paddingVertical: 8,
      color: '#000',
    },
    button: {
      backgroundColor: '#ff6347',
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 10,
      marginTop: 10,
      width: '100%',
    },
    buttonText: {
      color: '#fff',
      fontSize: 17,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    linkText: {
      marginTop: 12,
      fontSize: 15,
      color: '#333',
    },
  });
