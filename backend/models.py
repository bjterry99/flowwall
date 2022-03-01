from django.db import models

class post(models.Model): #model for the post, simply includes an ID and post text
    post_id = models.AutoField(primary_key=True)
    text = models.CharField(max_length=244, default="tweet", verbose_name="Tweet")

    def __str__(self):
        return self.text