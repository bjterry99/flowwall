# Generated by Django 3.2.8 on 2022-02-23 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='post',
            fields=[
                ('post_id', models.AutoField(primary_key=True, serialize=False)),
                ('text', models.CharField(default='tweet', max_length=244, verbose_name='Tweet')),
            ],
        ),
    ]