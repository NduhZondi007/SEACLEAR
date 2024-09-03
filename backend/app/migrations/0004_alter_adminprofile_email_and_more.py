# Generated by Django 5.0.7 on 2024-09-03 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_userprofile_email_userprofile_first_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='adminprofile',
            name='email',
            field=models.EmailField(default='guest@gmail.com', max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='adminprofile',
            name='first_name',
            field=models.CharField(default='guestFirstname', max_length=50),
        ),
        migrations.AlterField(
            model_name='adminprofile',
            name='last_name',
            field=models.CharField(default='guestLastname', max_length=50),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='email',
            field=models.EmailField(default='guest@gmail.com', max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='first_name',
            field=models.CharField(default='guestFirstname', max_length=50),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='last_name',
            field=models.CharField(default='guestLastname', max_length=50),
        ),
    ]
