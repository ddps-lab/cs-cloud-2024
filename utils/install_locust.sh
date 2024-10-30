#!/bin/bash
sudo -u ec2-user -i <<'EOF1'
sudo yum update
sudo yum -y install python3-pip
pip3 install locust
cd /home/ec2-user
cat <<EOF2 > locustfile.py
from locust import HttpUser, task
class HelloWorldUser(HttpUser):
    @task
    def hello_world(self):
        self.client.get("/suppliers")
EOF2
locust
EOF1
cat <<EOF3 > /etc/rc.d/rc.local
#!/bin/bash
sudo -u ec2-user -i <<'EOF'
cd /home/ec2-user
locust
EOF
EOF3
chmod +x /etc/rc.d/rc.local
