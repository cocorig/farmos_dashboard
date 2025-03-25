import { Client as SSHClient } from "ssh2";
import dotenv from "dotenv";
dotenv.config();

const sshConfig = {
  host: process.env.SSH_HOST,
  port: process.env.SSH_PORT,
  username: process.env.SSH_USER,
  password: process.env.SSH_PASSWORD,
};

const ssh = new SSHClient();

export function connectSSH() {
  return new Promise((resolve, reject) => {
    ssh
      .on("ready", () => {
        ssh.forwardOut(
          process.env.REMOTE_HOST,
          process.env.REMOTE_PORT,
          process.env.REMOTE_HOST,
          process.env.REMOTE_MYSQL_PORT,
          (err, stream) => {
            if (err) {
              reject("SSH 포워딩 설정 실패: " + err);
            } else {
              console.log("SSH 터널링 설정 완료");
              resolve(stream);
            }
          }
        );
      })

      .on("error", (err) => {
        reject("SSH 연결 실패: " + err);
      })
      .connect(sshConfig);
  });
}
