#!/bin/bash
# 우분투 시스템 패키지 업데이트
sudo apt-get update -y
# 필요한 패키지 설치
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common -y
# Docker의 공식 GPG키를 추가
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
# Docker의 공식 apt 저장소를 추가
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# 시스템 패키지 업데이트
sudo apt update -y
# Docker 설치
sudo apt install docker-ce -y
# docker를 sudo 명령어 없이 사용
sudo usermod -aG docker $USER
newgrp docker 


