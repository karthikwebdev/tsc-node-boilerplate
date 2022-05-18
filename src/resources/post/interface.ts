import { Document } from 'mongoose';

export interface Post {
  title: string;
  body: string;
}

export interface PostDocument extends Document, Post {}
