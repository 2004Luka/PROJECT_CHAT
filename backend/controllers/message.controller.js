import Coversation from '../models/conversation.model.js'

export const sendMessage = async(req,res)=>{
    try{
        const {message}=req.body;
        const {id:receiverId}=req.params;
        const senderId = req.user._id;

        let conversation = await Coversation.findOne({
            participants:{
                $all:[senderId,receiverId]
            }
        })

        if(!conversation){
            conversation = await Coversation.create({
                participants:[senderId,receiverId],
            })
        }

        const newMessage = new MessageChannel({
            senderId,
            receiverId,
            message,
        })
        

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }


        //socket iofunctionality goes here 

        //this will run in parallel
        await Promise.all([
            await conversation.save(),
            await newMessage.save()
        ]);

        res.status(201).json(newMessage);
        

    }catch(error){
        console.log("error in sendMessages controller: ",error.message)
        res.status(500).json({error:"internal server error"});
    }
}