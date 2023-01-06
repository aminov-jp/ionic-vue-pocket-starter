
import PocketBase from 'pocketbase'

const client = new PocketBase(process.env.VUE_APP_POCKET_URL);

export default  client
