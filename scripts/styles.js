import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#ED9DBB',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding:10
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  addButton: {
    padding: 10,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
  },
  todoContent: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
  },
  todoStatus: {
    fontSize: 14,
    color: '#555',
  },
  todoActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
