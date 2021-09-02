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
cd akatsuki
python manage.py migrate
```

If you get any error like 
```
ModuleNotFoundError: No module named 'grappelli.urls'
```
Then just google the module and you'll get the pip commond to run, 
for example in this case:
```
pip install django-grappelli
```

Run Server:
```sh
python manage.py runserver
```

