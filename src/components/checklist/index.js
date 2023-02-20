import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Entypo, MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components';

import Api from '~/services/Api';

export default function TodoList() {
  const [visitas, setVisitas] = useState();
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);

  const getVisitas = async () => {
    const id = await AsyncStorage.getItem('@id');
    const res = await Api.getTask(id);
    setVisitas(res);
    setId(id);
  };

  const refresh = async () => {
    const res = await Api.getTask(id);
    setVisitas(res);
  };

  useEffect(() => {
    getVisitas();
  }, []);

  const renderItem = useCallback((task) => {
    const checkTask = async () => {
      const id = task.item.id;
      if (id) {
        await Api.checkTask(id);
        refresh();
      }
    };
    const deletTask = async () => {
      const id = task.item.id;
      const res = await Api.deletTask(id);
      refresh();
    };

    return (
      <SafeAreaView
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
      >
        <Container>
          <TouchableOpacity
            onPress={checkTask}
            style={
              task.item.isComplet === 1 ? styles.checked : styles.unChecked
            }
          >
            {task.item.isComplet === 1 && (
              <Entypo
                name="check"
                size={16}
                color="#FAFAFA"
              />
            )}
          </TouchableOpacity>

          <Text
            style={
              task.item.isComplet === 1
                ? [
                    styles.texto,
                    { textDecorationLine: 'line-through', color: '#73737373' },
                  ]
                : styles.texto
            }
          >
            {task.item.task}
          </Text>
        </Container>
        <TouchableOpacity onPress={deletTask}>
          <MaterialIcons
            style={{ marginRight: 20 }}
            name="delete"
            size={25}
            color="black"
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  });

  return (
    <FlatList
      data={visitas}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
}
const Container = styled.SafeAreaView`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const styles = StyleSheet.create({
  texto: {
    fontWeight: 'bold',
    color: 'black',
  },

  checked: {
    width: 20,
    height: 20,
    marginRight: 13,
    borderRadius: 6,
    backgroundColor: '#1cade2',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  unChecked: {
    width: 20,
    height: 20,
    marginRight: 13,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    borderRadius: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
});
