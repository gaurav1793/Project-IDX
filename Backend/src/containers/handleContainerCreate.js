import Docker from  'dockerode';

const docker = new Docker();

export const handleContainerCreate = async(projectId ,socket)=>{
    try {
        const container = await docker.createContainer({
            Image:'sandbox',
            AttachStdin:true,
            AttachStdout:true,
            AttachStderr:true,
            Cmd:['/bin/bash'],
            Tty:true,
            User:'sandbox',
            HostConfig:{
                Binds:[ //mounting the project directory to the container
                    `${process.cwd()}/projects/${projectId}:/home/sanbox/app`
                ],
                PortBindings:{
                    '5173/tcp':[
                        {
                            'HostPort':'0'  //random port will be assigned by the docker
                        }
                    ]
                },
                ExposedPorts:{
                    '5173/tcp':{}
                },
                Env:["HOST=0.0.0.0"]
            }
        })
    
        console.log('constainer created ',container.id);

        await container.start();

        console.log('container started');
    } catch (error) {
        console.log('error while created a continer',error);
    }

}