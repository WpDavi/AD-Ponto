import AsyncStorage from '@react-native-async-storage/async-storage';

import * as FileSystem from 'expo-file-system';
import * as Notifications from 'expo-notifications';

const BASE_API = 'http://66.94.120.192:5001';
//const BASE_API = 'http://192.168.0.61:5001';
//const BASE_API = 'http://192.168.1.6:5001';

export default {
  signIn: async (email, senha, empresa) => {
    const req = await fetch(`${BASE_API}/user/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: senha,
        empresa: empresa,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await req.json();
    return json;
  },

  signInChave: async (chave, empresa) => {
    const req = await fetch(`${BASE_API}/user/loginChave`, {
      method: 'POST',
      body: JSON.stringify({
        chave,
        empresa,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await req.json();
    return json;
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
  },

  checktoken: async () => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/checktoken`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    console.log(json);
    if (json === 'auth') {
      console.log('token valido');
    } else {
      await AsyncStorage.clear();
    }
    return json;
  },

  point: async (email, hour, date, lat, long, image) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/dashboard/point`, {
      method: 'POST',
      body: JSON.stringify({
        date: date,
        hour: hour,
        email: email,
        latitude: lat,
        longitude: long,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });

    const json = await req.json();
    console.log(json);
    return json;
  },

  pointChave: async (date, hour, chave, lat, long, image, empresa) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/dashboard/pointchave`, {
      method: 'POST',
      body: JSON.stringify({
        date: date,
        hour: hour,
        latitude: lat,
        longitude: long,
        empresa: empresa,
        chave: chave,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });

    const json = await req.json();
    console.log(json);
    return json;
  },

  pointQr: async (qrEmail, hour, date, lat, long, image) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/dashboard/point`, {
      method: 'POST',
      body: JSON.stringify({
        date: date,
        hour: hour,
        email: qrEmail,
        latitude: lat,
        longitude: long,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });

    const json = await req.json();
    console.log('aaaaaaaaaaaaaaaaa', json);
    return json;
  },

  getlestactive: async () => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/dashboard/last-activities`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  getHistoricoActive: async () => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/dashboard/historic-activities`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;

    // json.map(activity => {console.log(activity.data, activity.hora)});
  },

  getInformacoesPessoais: async () => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/dashboard/personal-information`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  updateInformacoesPessoais: async ({
    id,
    pis,
    rg,
    funcionario,
    foto,
    email,
    dt_nascimento,
    ctps,
    cpf,
    formData,
  }) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(
      `${BASE_API}/dashboard/personal-information/editar/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          pis,
          rg,
          funcionario,
          email,
          dt_nascimento,
          ctps,
          cpf,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      },
    );
    const json = await req.json();
    return json;
  },

  uploudFiles: async (image) => {
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await FileSystem.uploadAsync(
        `${BASE_API}/dashboard/upload`,
        image,
        {
          fieldName: 'files',
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          headers: {
            Accept: 'application/json',
            Authorization: `${token}`,
          },
        },
      );
      console.log(JSON.stringify(response, null, 4));
    } catch (error) {
      console.log(error);
    }
  },

  gethours: async () => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/dashboard/hours`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  getAtestado: async () => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/deshboard/atestados`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  uploudImgPerfil: async (uploudimg) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await FileSystem.uploadAsync(
        `${BASE_API}/dashboard/imgperfil`,
        uploudimg,
        {
          fieldName: 'files',
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          headers: {
            Accept: 'application/json',
            Authorization: `${token}`,
          },
        },
      );
      console.log(JSON.stringify(response, null, 4));
    } catch (error) {
      console.log(error);
    }
  },

  getCidade: async () => {
    const req = await fetch('https://ipinfo.io/json');
    const json = await req.json();
    return json;
  },

  updatPass: async (senhaAtual, novaSenha) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/uset/changePassw`, {
      method: 'POST',
      body: JSON.stringify({
        password: senhaAtual,
        novasenha: novaSenha,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  uploudPonto: async (email, hour, date, lat, long, image) => {
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await FileSystem.uploadAsync(
        `${BASE_API}/dashboard/uploadponto`,
        image,
        {
          fieldName: 'files',
          httpMethod: 'POST',
          body: JSON.stringify({
            date: date,
            hour: hour,
            email: email,
            latitude: lat,
            longitude: long,
          }),
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          headers: {
            Accept: 'application/json',
            Authorization: `${token}`,
          },
        },
      );
      const json = response.body;
      console.log('resssssssssssssssssss', json);
      return json;
    } catch (error) {
      console.log(error);
    }
  },

  uploudPontoChave: async (empresa, chave, lat, long, image) => {
    try {
      const response = await FileSystem.uploadAsync(
        `${BASE_API}/dashboard/uploadpontochave`,
        image,
        {
          fieldName: 'files',
          httpMethod: 'POST',
          body: JSON.stringify({
            empresa: empresa,
            chave: chave,
            latitude: lat,
            longitude: long,
          }),
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          headers: {
            Accept: 'application/json',
          },
        },
      );
      const json = response.body;
      return json;
    } catch (error) {
      console.log(error);
    }
  },

  solicitar_Edicao: async (
    informacao,
    data,
    observação,
    dataa,
    pontoAtual,
    newPonto,
  ) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/uset/solicitar_edicao`, {
      method: 'POST',
      body: JSON.stringify({
        pis: informacao,
        data_marcacao: data,
        observacao: observação,
        data_solicitacao: dataa,
        entrada_1_atual: pontoAtual,
        entrada_1_solicitacao: newPonto,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  solicitar_Ferias: async (dataInicial, dataTermino, id) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/solicitarferias`, {
      method: 'POST',
      body: JSON.stringify({
        data_ini: dataInicial,
        data_fim: dataTermino,
        status_solicitacao: '',
        status_solicitaca_desc: '',
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  PointPhp: async (pis, lat, long, dataa, empresa) => {
    console.log('ponto php');
    console.log(
      'pis' + pis,
      'lat' + lat,
      'long' + long,
      'dataa' + dataa,
      'empresa' + empresa,
    );
    const res = await fetch(
      `https://app.adponto.com.br/processa_ponto/?pis=${pis}&lat=${lat}&long=${long}&foto=IMG_${dataa}.jpg&database=${empresa}`,
    );
    //console.log(res);
    console.log('req api deles', res.url);
    return 'suce';
  },

  getFerias: async () => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/user/getFerias`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  getSolicitaçãoPonto: async () => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/user/getSolicitacaoPonto`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  getAllFerias: async () => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/user/getAllFerias`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  getAllSolicitaçãoPonto: async () => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/user/getAllSolicitacaoPonto`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  PutFerias: async (id, aceite) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/gestor/putFerias`, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        status: aceite,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  getGestorhours: async () => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/dashboard/newhours`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  getGestorhourss: async (funcionario, dataInicial, dataFinal) => {
    console.log(funcionario, dataInicial, dataFinal);
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/dashboard/newhoursDate`, {
      method: 'POST',
      body: JSON.stringify({
        funcionario,
        dataInicial,
        dataFinal,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  getAllInformacoesPessoais: async (pis) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/dashboard/Allpersonal-information`, {
      method: 'POST',
      body: JSON.stringify({
        pis: pis,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  editPonto: async (
    entrada1,
    saida1,
    entrada2,
    saida2,
    entrada3,
    saida3,
    entrada4,
    saida4,
    entrada5,
    saida5,
    entrada6,
    saida6,
    entrada7,
    saida7,
    entrada8,
    saida8,
    entrada9,
    saida9,
    entrada10,
    saida10,
    pis,
    data,
  ) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/dashboard/gestorEditPonto`, {
      method: 'POST',
      body: JSON.stringify({
        entrada1,
        saida1,
        entrada2,
        saida2,
        entrada3,
        saida3,
        entrada4,
        saida4,
        entrada5,
        saida5,
        entrada6,
        saida6,
        entrada7,
        saida7,
        entrada8,
        saida8,
        entrada9,
        saida9,
        entrada10,
        saida10,
        pis,
        data,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  getOnePont: async (
    entrada1,
    saida1,
    entrada2,
    saida2,
    entrada3,
    saida3,
    entrada4,
    saida4,
    entrada5,
    saida5,
    entrada6,
    saida6,
    entrada7,
    saida7,
    entrada8,
    saida8,
    entrada9,
    saida9,
    entrada10,
    saida10,
    pis,
    data,
  ) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/dashboard/getOnePont`, {
      method: 'POST',
      body: JSON.stringify({
        entrada1,
        saida1,
        entrada2,
        saida2,
        entrada3,
        saida3,
        entrada4,
        saida4,
        entrada5,
        saida5,
        entrada6,
        saida6,
        entrada7,
        saida7,
        entrada8,
        saida8,
        entrada9,
        saida9,
        entrada10,
        saida10,
        pis,
        data,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  SolicitarEditPonto: async (
    entrada11,
    saida11,
    entrada22,
    saida22,
    entrada33,
    saida33,
    entrada44,
    saida44,
    entrada55,
    saida55,
    entrada66,
    saida66,
    entrada77,
    saida77,
    entrada88,
    saida88,
    entrada99,
    saida99,
    entrada100,
    saida100,
    entrada1,
    saida1,
    entrada2,
    saida2,
    entrada3,
    saida3,
    entrada4,
    saida4,
    entrada5,
    saida5,
    entrada6,
    saida6,
    entrada7,
    saida7,
    entrada8,
    saida8,
    entrada9,
    saida9,
    entrada10,
    saida10,
    pis,
    data,
    obsentrada1,
    obsSaisa1,
    obsentrada2,
    obsSaisa2,
    obsentrada3,
    obsSaisa3,
    obsentrada4,
    obsSaisa4,
    obsentrada5,
    obsSaisa5,
    obsentrada6,
    obsSaisa6,
    obsentrada7,
    obsSaisa7,
    obsentrada8,
    obsSaisa8,
    obsentrada9,
    obsSaisa9,
    obsentrada10,
    obsSaisa10,
  ) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/dashboard/solicitarEditPonto`, {
      method: 'POST',
      body: JSON.stringify({
        entrada11,
        saida11,
        entrada22,
        saida22,
        entrada33,
        saida33,
        entrada44,
        saida44,
        entrada55,
        saida55,
        entrada66,
        saida66,
        entrada77,
        saida77,
        entrada88,
        saida88,
        entrada99,
        saida99,
        entrada100,
        saida100,
        entrada1,
        saida1,
        entrada2,
        saida2,
        entrada3,
        saida3,
        entrada4,
        saida4,
        entrada5,
        saida5,
        entrada6,
        saida6,
        entrada7,
        saida7,
        entrada8,
        saida8,
        entrada9,
        saida9,
        entrada10,
        saida10,
        pis,
        data,
        obsentrada1,
        obsSaisa1,
        obsentrada2,
        obsSaisa2,
        obsentrada3,
        obsSaisa3,
        obsentrada4,
        obsSaisa4,
        obsentrada5,
        obsSaisa5,
        obsentrada6,
        obsSaisa6,
        obsentrada7,
        obsSaisa7,
        obsentrada8,
        obsSaisa8,
        obsentrada9,
        obsSaisa9,
        obsentrada10,
        obsSaisa10,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  StatusSolicitarEditPonto: async (status, pis, data) => {
    const token = await AsyncStorage.getItem('token');
    console.log('status', status);
    console.log('pis', pis);
    console.log('data', data);

    const req = await fetch(`${BASE_API}/dashboard/statusSolicitarEditPonto`, {
      method: 'POST',
      body: JSON.stringify({
        status: status,
        pis: pis,
        data: data,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  getAllFuncionarios: async () => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/dashboard/allFuncionarios`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  gerenciarBaterPonto: async (pis, foto) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/dashboard/gerenciarBaterPonto`, {
      method: 'POST',
      body: JSON.stringify({
        foto: foto,
        pis: pis,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  getGestor: async () => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/getGestorPersonalInformation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  getEmpresa: async () => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/deshboard/empresas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  suporte: async (nome_usuario, email, mensagem, idFuncionario) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/dashboard/suporte`, {
      method: 'POST',
      body: JSON.stringify({
        nome_usuario,
        mensagem,
        idFuncionario,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const reqSendMail = await fetch(`${BASE_API}/user/sandEmails`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        mensagem,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  getInfoChave: async (chave, empresa) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/infoChave`, {
      method: 'POST',
      body: JSON.stringify({
        chave,
        empresa,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  funcionarioVisita: async (
    data,
    cliente,
    nameDestination,
    destination,
    distance,
    timeEmRota,
    prince,
  ) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/upVisita`, {
      method: 'POST',
      body: JSON.stringify({
        data: data,
        cliente: cliente,
        endereço: nameDestination,
        cords: destination,
        kms: distance,
        tempo_em_rota: timeEmRota,
        reembolso: prince,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
  },

  getVisitas: async () => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/user/upVisita`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  getTask: async (id) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/getTask`, {
      method: 'POST',
      body: JSON.stringify({
        id_visita: id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = req.json();
    return json;
  },

  checkTask: async (id) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/putTask`, {
      method: 'POST',
      body: JSON.stringify({
        id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = req.json();
    return json;
  },

  postTask: async (id_visita, task) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/postTask`, {
      method: 'POST',
      body: JSON.stringify({
        id_visita,
        task,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = req.json();
    return json;
  },

  deletTask: async (id) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/deletTask`, {
      method: 'POST',
      body: JSON.stringify({
        id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = req.json();
    return json;
  },

  checkIn: async (id) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/check_in`, {
      method: 'POST',
      body: JSON.stringify({
        id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  checkOut: async (id) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/check_out`, {
      method: 'POST',
      body: JSON.stringify({
        id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  solicitarVisita: async (
    pis,
    data,
    horario,
    cliente,
    nameDestination,
    destination,
  ) => {
    console.log(pis);
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/gestor/SolcitarVisita`, {
      method: 'POST',
      body: JSON.stringify({
        pis,
        data,
        horario_da_visita: horario,
        cliente,
        endereço: nameDestination,
        cords: destination,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
  },

  getSolicitaçãoVisita: async () => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/GetSolcitarVisita`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  deleteVisita: async (id) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/deleterota`, {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  getGestorSolicitaçãoVisita: async () => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/gestor/GetSolcitarVisita`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  getGestorVisita: async () => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/gestor/upVisita`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  uploudAssinatura: async (image) => {
    console.log('api', image);
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await FileSystem.uploadAsync(
        `${BASE_API}/dashboard/uploadassinatura`,
        image,
        {
          fieldName: 'files',
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          headers: {
            Accept: 'application/json',
            Authorization: `${token}`,
          },
        },
      );
      const json = response.body;
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  },

  uploudAssinatura2: async (id) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/dashboard/uploadassinatura2`, {
      method: 'POST',
      body: JSON.stringify({
        id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  comparationFaceID2: async (photo) => {
    var myHeaders = new Headers();
    myHeaders.append('token', '86a9f01f8b8f4ad08632024ba818b027');
    var formdata = new FormData({ photo });
    formdata.append('photo', photo);
    const req = await fetch('https://api.luxand.cloud/photo/search', {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    });
    const json = await req.json();
    return json;
  },

  CadastroFaceID2: async (photo, pis) => {
    var myHeaders = new Headers();
    myHeaders.append('token', '86a9f01f8b8f4ad08632024ba818b027');
    var formdata = new FormData({ photo });
    formdata.append('name', pis);
    formdata.append('store', '1');
    formdata.append('photo', photo);
    const req = await fetch('https://api.luxand.cloud/person', {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    });
    const json = await req.json();
    console.log(json);
    return json;
  },

  postinfosFaceID: async (id, url) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/postFaceID`, {
      method: 'POST',
      body: JSON.stringify({
        IdFaceID: id,
        urlFaceID: url,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
  },

  getallpersonalPis: async (pis) => {
    console.log(pis);
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/getallpersonalPis`, {
      method: 'POST',
      body: JSON.stringify({
        pis,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  getFotoEmail: async (email) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/getFoto`, {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  /* notification */

  registerForPushNotification: async (token) => {
    try {
      const expoPushToken = await Notifications.getExpoPushTokenAsync({
        experienceId: '@username/example',
      });

      const req = await fetch(
        `${BASE_API}/user/register-for-push-notification`,
        {
          method: 'POST',
          body: JSON.stringify({
            token: token,
            pushNotificationsToken: expoPushToken,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .fetch((r) => r.json())
        .catch(() => ({}));

      return req;
    } catch (e) {
      console.log(e);
      return {};
    }
  },

  notification: async (pis, msg, assunto) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/dashboard/notification`, {
      method: 'POST',
      body: JSON.stringify({
        pis,
        mensagem: msg,
        assunto,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  getNotification: async () => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/dashboard/notification`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },

  createPushNotification: async (token, assunto, msg) => {
    console.log(token, assunto, token);
    const message = {
      to: token,
      sound: 'default',
      title: assunto,
      body: msg,
      data: { someData: 'goes here' },
    };
    const req = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    const json = await req.json();
    return json;
  },

  pushNotification: async (pis, tokenn) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/pushToken`, {
      method: 'POST',
      body: JSON.stringify({
        pis,
        tokenn,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    console.log('reposta token', json);
    return json;
  },

  deleteNotification: async (id) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/dashboard/notification`, {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const json = await req.json();
    return json;
  },
};
