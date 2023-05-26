import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): {} {
    return {
      output: 'Yes',
      statuscode: 0,
    };
  }
  execRun(script: string): {} {
    console.log('script', script);
    const Docker = require('dockerode');
    const docker = new Docker();
    const currentDirectory = process.cwd();
    const runOptions = {
      Cmd: ['python', '-c', script],
      // HostConfig: {
      //   Binds: [`${currentDirectory}:/script`], // Mounting the script directory
      // },
    };
    let returnOutput = '';
    const outputStream = new (require('stream').Writable)({
      write(chunk, encoding, callback) {
        const output = chunk.toString();
        returnOutput += output;
        // Process the output as desired
        console.log('writable', output);
        callback();
      },
    });
    docker.run(
      'python',
      [],
      outputStream,
      runOptions,
      (err, data, container) => {
        if (err) {
          console.error(err);
        } else {
          console.log(data.StatusCode); // Exit code of the container
          container.remove((err, data) => {
            if (err) {
              console.error(err);
            } else {
              console.log('Container removed');
              console.log(returnOutput);
            }
          });
        }
      },
    );
    return {
      output: 'N',
      statuscode: 0,
    };
  }
}
