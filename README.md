![demo-gif](demo.gif)


## Disclaimer
This software is meant to be a productive contribution to the rapidly growing AI-generated media industry. It will help artists with tasks such as animating a custom character or using the character as a model for clothing etc.

The developers of this software are aware of its possible unethical applications and are committed to take preventative measures against them. It has a built-in check which prevents the program from working on inappropriate media including but not limited to nudity, graphic content, sensitive material such as war footage etc. We will continue to develop this project in the positive direction while adhering to law and ethics. This project may be shut down or include watermarks on the output if requested by law.

Users of this software are expected to use this software responsibly while abiding by local laws. If the face of a real person is being used, users are required to get consent from the concerned person and clearly mention that it is a deepfake when posting content online. Developers of this software will not be responsible for actions of end-users.

## Intro

This is a MODIFIED web ui version of https://github.com/hacksider/Deep-Live-Cam prepared for Docker
Only linux os supported.

## Docker setup

allow docker to access display

    xhost +local:docker

*nvidia (Cuda)*

    docker build -t deep-live-cam-web -f Dockerfile.gpu .


server version, mounting `Pictures` folder into container

    docker run -it --rm --name deep-live-cam-web -e DISPLAY=$DISPLAY --gpus all \
      -v ~/Pictures:/app/pics -p 5000:5000 --user 0 --privileged deep-live-cam-web

*intel (xpu)*

will work on any other setup but then using CPU

    docker build -t deep-live-cam-web -f Dockerfile.xpu .

server version, mounting `Pictures` folder into container

    docker run -it --rm --name deep-live-cam-web -e DISPLAY=$DISPLAY --device=/dev/video0:/dev/video0 \
      -v /tmp/.X11-unix:/tmp/.X11-unix  -v /dev/dri/card1:/dev/dri/card1 -v /dev/dri/renderD128:/dev/dri/renderD128 \
      -v ~/Pictures:/app/pics -p 5000:5000 --user 0 --privileged deep-live-cam-web

development version, mounting source as volume and launching shell

    docker run -it --rm --name deep-live-cam-web -e DISPLAY=$DISPLAY --device=/dev/video0:/dev/video0 \
      -v /tmp/.X11-unix:/tmp/.X11-unix  -v ./static:/app/static -v /dev/dri/card1:/dev/dri/card1 -v /dev/dri/renderD128:/dev/dri/renderD128 \
      -v ~/Pictures:/app/pics -p 5000:5000 --user 0 --privileged deep-live-cam-web bash

now accessible at localhost:5000 in browser

## Setup

python3.10 -m venv env

source env/bin/activate

pip install -r requirements.txt

python3 app.py

http://127.0.0.1:5000/

Note: change the model from inswapper_128_fp16.onnx to inswapper_128.onnx, then it's on GPU.