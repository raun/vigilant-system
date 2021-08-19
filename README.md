# vigilant-system
Feature request submission system

Install Pip:

```sh
curl https://bootstrap.pypa.io/get-pip.py > get-pip.py
sudo python3 get-pip.py
```

Install VirtualEnv:
```sh
pip install virtualenv
```

Setup virtual environment:
```sh
mkdir env
cd env
virtualenv . -p python3
source ./bin/activate
cd ..
```

Create DB tables:
```sh
python manage.py migrate
```

Run Server:
```sh
python manage.py runserver
```

