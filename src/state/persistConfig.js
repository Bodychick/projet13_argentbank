// persistConfig.js
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // importez le moyen de stockage que vous souhaitez utiliser (par exemple, localStorage)

const persistConfig = {
  key: 'root', // La clé racine pour stocker dans le stockage local
  storage, // Le moyen de stockage que vous avez importé
  whitelist: ['status','token',"email","firstName","id","lastName"], // Les reducers que vous souhaitez persister (par exemple, 'user')
  // blacklist: [], // Vous pouvez également utiliser blacklist pour exclure certains reducers de la persistance
};

export default persistConfig;
