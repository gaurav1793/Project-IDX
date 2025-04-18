export const ping =(req,res)=>{
    return res.status(200).json({
        message:"ping"
    })
}