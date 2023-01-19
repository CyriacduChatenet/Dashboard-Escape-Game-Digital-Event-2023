import Airtable from 'airtable'


const AirtableConfig = (() => {
    let base = null;
    return new function(){
        this.getBase = (apiKeyParams, baseIdParams) => {
            if (base === null) {
                const apiKey = "keyChSephx5tcEfAn"
                const baseID = "appD0zmxAdmjpV4CT"
                base = new Airtable({apiKey: apiKey}).base(baseID)
            }
            return base;
        }
    }
})()

export default AirtableConfig