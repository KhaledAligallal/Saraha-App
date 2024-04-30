export const   findDocument = async(model,query)=>{

    if(!model || ! query)return {msg:'invalid arguments',status:404,success:false}
const isDocumentExsist = await model.findOne(query)
if(!isDocumentExsist)return {msg:'document not found',status:404,success:false}
return{msg:'documet found',isDocumentExsist,success:true}


}