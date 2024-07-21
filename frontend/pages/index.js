// index.js
import Head from 'next/head';
import Link from 'next/link'; // Import Link
import styles from '../styles/Home.module.css';
import { ChakraProvider } from "@chakra-ui/react";

export default function Home() {
  return (
    <ChakraProvider>
    <div>
      ACM India Dashboard
      <nav>
        <Link href="/about">About Us</Link>
        <Link href="/register">Register here</Link>
        <Link href="/login">Login here</Link>
        <Link href="/home">Home</Link>
        <Link href="/form">Form</Link>
      </nav>
    </div>
    </ChakraProvider>
  );
}