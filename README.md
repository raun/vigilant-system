# vigilant-system
Feature request submission system

Install Pip:

`curl https://bootstrap.pypa.io/get-pip.py > get-pip.py
sudo python3 get-pip.py`

Install VirtualEnv:
`pip install virtualenv`

Setup virtual environment:
`mkdir env
cd env
virtualenv . -p python3
source ./bin/activate`

Create DB tables:
`python manage.py migrate`

Run Server:
`python manage.py runserver`

