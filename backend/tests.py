from rest_framework.test import APITestCase
from rest_framework import status
from .models import post

class TestListCreatePost(APITestCase) :
    def test_creates_post(self) : #test for post creation
        previous_post_count = post.objects.all().count()
        sample_post = {'text':"TEST POST"}
        response = self.client.post("/posts/", sample_post)
        self.assertEqual(post.objects.all().count(), previous_post_count+1)
        self.assertEqual(response.data, {'post_id': 1, 'text': 'TEST POST'})

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_all_posts(self) : #test for return all posts
        response = self.client.get("/posts/")
        self.assertIsInstance(response.data, list)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_one_post(self) : #test for returning specific post
        sample_post = {'text':"TEST POST"}
        self.client.post("/posts/", sample_post)

        response = self.client.get("/posts/1/")
        self.assertEqual(response.data['text'], "TEST POST")

        