import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import { translations } from '../data/content'
import { FaArrowRight, FaAward, FaCode, FaEnvelope, FaFolderOpen, FaUser } from 'react-icons/fa'
import portraitImage from '../assets/hero.png'
import '../styles/portfolio.css'

function renderSkillIcon(name) {
  switch (name) {
    case 'html':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 2h16l-1.5 17L12 22l-6.5-3L4 2Zm2.7 2 1.1 12.4 4.2 1.9 4.2-1.9L17.3 4H6.7Zm2 1.8h6.6l-.3 3.3H10l.1 1.5h4.5l-.4 4.2-2.4 1-2.4-1-.2-2.1H8.8l.3 3.1 4.4 1.8 4.4-1.8.7-8.3H8.7l-.3-3.3Z" />
        </svg>
      )
    case 'css':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 2h16l-1.4 15.8L12 22l-6.6-4.2L4 2Zm2.3 2 1 10.3 4.7 2.4 4.7-2.4 1-10.3H6.3Zm2 2.1h6.8l-.2 2.2H10l.1 1.8h4.8l-.2 2.8H10.2l.1 1.8h4.5l-.3 3.4-2.4 1-2.4-1-.1-1.4H8.7l.2 2.7 4.1 1.7 4.1-1.7.7-7.8H8.3l-.2-2.2Z" />
        </svg>
      )
    case 'javascript':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 3h18v18H3zM8 7.5v9c0 .6.4 1 1 1h1.5v-2H10v-7h1v-2H8.5c-.5 0-.5 0-.5 1Zm7.5 1.5c1.2 0 2 .6 2 1.6 0 .8-.5 1.3-1.4 1.7l-.8.3c-1.2.5-1.8 1.1-1.8 2.2 0 1.4 1.1 2.4 2.8 2.4 1.3 0 2.2-.4 2.9-1.3l-1.3-.9c-.4.5-.9.8-1.6.8-.8 0-1.3-.4-1.3-1 0-.7.4-1 1.5-1.4l.7-.3c1.4-.5 2.2-1.2 2.2-2.5 0-1.5-1.2-2.5-3-2.5-1.5 0-2.6.5-3.3 1.5l1.3 1c.5-.7 1-.9 1.7-.9Z" />
        </svg>
      )
    case 'react':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3c-2.7 0-5 1.2-6.6 3.1a9.8 9.8 0 0 0 0 9.8C7 17.8 9.3 19 12 19c2.7 0 5-1.2 6.6-3.1a9.8 9.8 0 0 0 0-9.8C17 4.2 14.7 3 12 3Zm0 2.4c1.9 0 3.6 1 4.7 2.5a6.9 6.9 0 0 1 0 6.2c-1.1 1.5-2.8 2.5-4.7 2.5s-3.6-1-4.7-2.5a6.9 6.9 0 0 1 0-6.2C8.4 6.4 10.1 5.4 12 5.4Zm0 2.7a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Z" />
        </svg>
      )
    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5c2.1-1.8 4.4-2.4 6.8-1.7 1.7.5 2.9 1.6 3.7 3.2-1.2-.8-2.5-1.2-3.9-1.1-1.6.1-2.9.9-3.8 2.2-.8 1.2-1 2.3-.8 3.6.2 1.3.8 2.2 1.8 2.9 1 .7 2.2 1 3.6 1 1.5-.1 2.8-.7 4-1.8-1.1 1-2.3 1.7-3.7 2-2.6.6-4.8-.2-6.4-2-1.3-1.5-1.8-3.4-1.3-5.3Z" />
        </svg>
      )
    case 'django':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2c-1.9 0-3.7.4-5.3 1.3V6c1.6-.8 3.3-1.2 5.3-1.2 2.4 0 3.9.7 3.9 2.4v1.1c0 1.6-1.2 2.5-3.1 2.9-2.5.5-4.8 1.2-4.8 3.8v2.3c0 2.7 2 4.2 5.1 4.2 1.8 0 3.5-.4 5.1-1.2v-3.4c-1.6.8-3.3 1.2-5.1 1.2-2.2 0-3.6-.7-3.6-2.2v-1.4c0-1.5 1.2-2.4 3.2-2.9 2.3-.5 4.8-1.2 4.8-3.7V4.5c0-2.6-2-4.5-5.2-4.5Z" />
        </svg>
      )
    case 'python':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 2h6v2h-2v2h2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2H9v-2h2v-2H9v-2h2v-2H9v-2h2V8H9V6h2V4H9V2Zm2 6h2v2h-2V8Zm0 4h2v2h-2v-2Z" />
        </svg>
      )
    case 'mysql':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 3h14v18H5zM7 5v14h10V5H7Zm2 2h6v2H9Zm0 4h6v2H9Zm0 4h6v2H9Z" />
        </svg>
      )
    case 'sqlite':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 3h14v18H5zM7 5v14h10V5H7Zm2 2h6v2H9Zm0 4h6v2H9Zm0 4h6v2H9Z" />
        </svg>
      )
    case 'figma':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 2h4a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8Zm4 8h4a4 4 0 0 1 0 8h-4a4 4 0 0 1 0-8Zm-4 8h4a4 4 0 1 1 0-8H8a4 4 0 1 1 0 8Z" />
        </svg>
      )
    case 'canva':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2 4v2h6V7H9Zm0 4v2h6v-2H9Zm0 4v2h4v-2H9Z" />
        </svg>
      )
    case 'ux':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4h16v16H4zM6 6v12h12V6H6Zm2 2h8v2H8Zm0 4h5v2H8Z" />
        </svg>
      )
    case 'git':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 3a3 3 0 1 0 3 3 3 3 0 0 0-3-3Zm6 5a3 3 0 1 0 3 3 3 3 0 0 0-3-3Zm-6 7a3 3 0 1 0 3 3 3 3 0 0 0-3-3Zm8.2-4.8 2.6-2.6a1 1 0 0 1 1.4 1.4l-2.6 2.6a3 3 0 0 1-4.2 4.2l-2.6 2.6a1 1 0 0 1-1.4-1.4l2.6-2.6a3 3 0 0 1 4.2-4.2Z" />
        </svg>
      )
    case 'github':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 2.6 1.2 3.3 1 0-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.2.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.7 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.5.2 2.7.1 3 .8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.3.7 1 .7 2.1V23c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.6 18.4.5 12 .5Z" />
        </svg>
      )
    case 'vscode':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 4.5 15.5 2 21 3.5v17L15.5 22 3 19.5 17 12 3 4.5Zm2.2 3.1 6.7 4.7-6.7 4.7V7.6Zm0 8.7 6.7-4.7 2.4 1.7-6.7 4.7-2.4-1.7Z" />
        </svg>
      )
    case 'postman':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2 4v10h10V7H7Zm2 2h6v2H9Zm0 4h4v2H9Z" />
        </svg>
      )
    case 'bootstrap':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4h16v16H4zM7 7v10h10V7H7Zm2 2h6v2H9Zm0 4h4v2H9Z" />
        </svg>
      )
    case 'vite':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 2 6l10 4 10-4-10-4Zm0 5.4L4 8.5l8 3.2 8-3.2-8-1.1ZM3 8.8v7.4l9 3.6 9-3.6V8.8L12 12 3 8.8Z" />
        </svg>
      )
    case 'nodejs':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 4 6v12l8 4 8-4V6l-8-4Zm0 2.3 6 3v11.4l-6 3-6-3V7.3l6-3Zm-1 3.8h2v6h3v2h-5v-8Z" />
        </svg>
      )
    case 'express':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5h16v14H4zM6 7v10h12V7H6Zm2 2h8v2H8Zm0 4h5v2H8Z" />
        </svg>
      )
    case 'adobexd':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4h14v16H5zM7 6v12h10V6H7Zm2 2h2.2l1.8 3.2L13 8h2l-3 5 3 5h-2l-1.8-3.2L9.2 18H7l3-5-3-5Z" />
        </svg>
      )
    case 'photoshop':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4h14v16H5zM7 6v12h10V6H7Zm2 2h2.5c1.1 0 2 .9 2 2 0 .8-.5 1.5-1.2 1.8L11.4 14H9.8l-1.2-2.7H9V14H7V8Zm2 2v2h.6c.3 0 .6-.2.6-.5 0-.3-.3-.5-.6-.5H9Z" />
        </svg>
      )
    case 'netlify':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 4 6v12l8 4 8-4V6l-8-4Zm0 2.3 6 3v11.4l-6 3-6-3V7.3l6-3Zm-2 3.4 2 1.1 2-1.1v2.4l-2 1.2-2-1.2V7.7Z" />
        </svg>
      )
    case 'vercel':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3 2 19h20L12 3Zm0 4 7 12H5l7-12Z" />
        </svg>
      )
    default:
      return null
  }
}

function renderIcon(name) {
  switch (name) {
    case 'github':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.91.58.11.79-.25.79-.56v-2.18c-3.2.7-3.88-1.38-3.88-1.38-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.56-.29-5.25-1.28-5.25-5.71 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.44-2.69 5.41-5.26 5.7.41.36.77 1.08.77 2.18v3.23c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.94 8.5A1.56 1.56 0 1 0 6.94 5.38a1.56 1.56 0 0 0 0 3.12ZM5.5 9.75h2.88V18H5.5zM10.22 9.75h2.76v1.12h.04c.38-.72 1.31-1.48 2.69-1.48 2.88 0 3.41 1.89 3.41 4.35V18h-2.88v-7.29c0-1.74-.03-3.98-2.42-3.98-2.43 0-2.8 1.9-2.8 3.86V18H10.22z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.25-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.04 2A9.96 9.96 0 0 0 2.08 12c0 1.75.46 3.46 1.33 4.95L2 22l5.2-1.37a9.96 9.96 0 0 0 4.84 1.18h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 1.8c4.52 0 8.16 3.64 8.16 8.16 0 4.52-3.64 8.16-8.16 8.16a8.14 8.14 0 0 1-3.92-1l-.28-.16-3.08.81.82-3-.17-.3A8.14 8.14 0 0 1 3.84 12c0-4.52 3.64-8.16 8.16-8.16Zm-1.02 3.2h-.01c-.2 0-.4.01-.61.03-.24.02-.49.07-.75.15-.24.07-.47.16-.69.27a1.8 1.8 0 0 0-.86 1.51c0 .42.08.8.24 1.13.16.34.36.64.61.9l.17.16-.26 1.01.98-.24.18.1c.3.17.63.29.98.36.35.07.71.1 1.08.1.38 0 .74-.05 1.09-.14.35-.09.68-.23.98-.43.4-.27.73-.63 1-.99.27-.37.4-.79.4-1.24 0-.3-.07-.58-.2-.83-.12-.25-.3-.47-.52-.67-.22-.2-.49-.35-.81-.46-.32-.11-.68-.16-1.06-.16-.29 0-.58.04-.87.11-.29.07-.55.16-.79.28-.24.11-.45.24-.64.38l-.2.15-.2-.02c-.28-.02-.56-.05-.83-.1-.27-.05-.57-.12-.88-.23-.31-.11-.61-.25-.89-.43-.28-.18-.54-.41-.77-.68-.23-.27-.41-.58-.52-.91-.11-.33-.15-.68-.15-1.03 0-.41.08-.81.24-1.17.16-.37.38-.71.66-1.01.28-.3.61-.55.98-.74.37-.19.77-.33 1.19-.42.42-.09.84-.13 1.27-.13.33 0 .67.04 1 .12.34.08.66.2.95.36.29.15.56.34.79.57.23.23.43.49.58.77.15.29.25.6.3.93.05.33.03.67-.05 1-.08.33-.24.63-.46.87-.22.24-.5.44-.83.57-.32.13-.67.2-1.02.2-.35 0-.69-.07-1.02-.2-.33-.13-.63-.3-.9-.5-.27-.2-.53-.43-.78-.69-.25-.26-.45-.56-.58-.88-.13-.32-.2-.64-.2-.96 0-.18.01-.37.04-.56.02-.2.06-.39.11-.57.05-.18.11-.35.18-.49.07-.15.15-.28.25-.4.1-.12.21-.22.34-.31.13-.09.28-.16.44-.19.16-.03.33-.04.5-.04.17 0 .34.02.51.06.17.05.33.12.47.2.15.09.3.18.44.28.14.1.25.24.34.39.09.15.16.31.2.47.04.16.06.34.08.54.1.21.02.42.03.63.03Z" />
        </svg>
      )
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.2l8 5 8-5V7H4Zm16 10H4V9.5l8 5 8-5V17Z" />
        </svg>
      )
    case 'about':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.33 0-6 1.79-6 4v1h12v-1c0-2.21-2.67-4-6-4Z" />
        </svg>
      )
    case 'education':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3 2 7l10 4 10-4-10-4Zm0 6.2L4 8.4v3.6c0 3.4 2.5 6.4 8 8 5.5-1.6 8-4.6 8-8V8.4l-8 2.8Z" />
        </svg>
      )
    case 'interest':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s-6.75-4.35-8.5-8.5A5.5 5.5 0 0 1 12 5.3a5.5 5.5 0 0 1 8.5 7.2C18.75 16.65 12 21 12 21Z" />
        </svg>
      )
    case 'mbkm':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4h16v4H4zM6 10h12v10H6z" />
        </svg>
      )
    case 'code':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.5 6 3 12l5.5 6 1.6-1.4L5.8 12l4.3-4.6L8.5 6Zm7 0-1.6 1.4 4.3 4.6-4.3 4.6 1.6 1.4L21 12l-5.5-6Z" />
        </svg>
      )
    case 'server':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 3h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 10h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Zm3 2v2h2v-2Zm4 0v2h2v-2Zm4 0v2h2v-2ZM8 7v2h2V7Zm4 0v2h2V7Zm4 0v2h2V7Z" />
        </svg>
      )
    case 'design':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2 4v10h10V7H7Zm2 2h6v2H9Zm0 4h4v2H9Z" />
        </svg>
      )
    case 'tool':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 7h-4V5a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Zm-8 2V5h2v4h-2Zm2 8v-4h2v4h-2Z" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2Zm7 11 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Zm-14 0 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" />
        </svg>
      )
    case 'coffee':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4h10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm12 2h1a2 2 0 0 1 2 2v1h-3V6Zm-2 10h3a2 2 0 0 1 2 2v1H15v-3Z" />
        </svg>
      )
    case 'portfolio':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm2 4v8h12V9H6Z" />
        </svg>
      )
    case 'award':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3a6 6 0 0 0-4.24 10.24L7 16H17l-.76-2.76A6 6 0 0 0 12 3Zm0 2a4 4 0 1 1-4 4 4 4 0 0 1 4-4Z" />
        </svg>
      )
    case 'workshop':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 7h18v2H3zm2 4h14v8H5zm2 2v4h10v-4z" />
        </svg>
      )
    case 'seminar':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5h16v2H4zm0 4h10v2H4zm0 4h16v2H4zm0 4h10v2H4z" />
        </svg>
      )
    case 'projects':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z" />
        </svg>
      )
    case 'connect':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 6h16v2H4zm0 5h10v2H4zm0 5h16v2H4z" />
        </svg>
      )
    case 'demo':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-3 3-3-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm2 4v2h10V8z" />
        </svg>
      )
    case 'certificate':
    case 'certificates':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 3h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2 4v2h10V7zm0 4v2h6v-2z" />
        </svg>
      )
    case 'contact':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.2l8 5 8-5V7H4Zm16 10H4V9.5l8 5 8-5V17Z" />
        </svg>
      )
    default:
      return null
  }
}

function Home() {
  void renderSkillIcon
  void renderIcon
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    const savedTheme = window.localStorage.getItem('portfolio-theme')
    if (savedTheme) return savedTheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    const savedLanguage = window.localStorage.getItem('portfolio-language')
    return savedLanguage === 'id' ? 'id' : 'en'
  })
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const content = translations[language]
  const heroHighlights = content.heroHighlights
  const pageDescriptions = language === 'en'
    ? {
        about: 'A closer look at my background, education, and interests.',
        skills: 'Technical and creative skills I am building every day.',
        projects: 'Selected work, the technologies behind it, and live demos.',
        certificates: 'Learning milestones and professional experiences.',
        contact: 'Ways to connect, collaborate, or start a conversation.',
      }
    : {
        about: 'Kenali latar belakang, pendidikan, dan hal yang saya minati.',
        skills: 'Kemampuan teknis dan kreatif yang terus saya kembangkan.',
        projects: 'Karya pilihan, teknologi yang digunakan, dan demo langsung.',
        certificates: 'Pencapaian belajar dan pengalaman profesional.',
        contact: 'Hubungi saya untuk berdiskusi atau berkolaborasi.',
      }
  const pageIcons = {
    about: <FaUser aria-hidden="true" />,
    skills: <FaCode aria-hidden="true" />,
    projects: <FaFolderOpen aria-hidden="true" />,
    certificates: <FaAward aria-hidden="true" />,
    contact: <FaEnvelope aria-hidden="true" />,
  }
  const navLinks = content.navLinks.map((link) => ({
    ...link,
    href: link.id === 'home' ? '/' : `/${link.id}`,
  }))

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document.documentElement.lang = language
    window.localStorage.setItem('portfolio-theme', theme)
    window.localStorage.setItem('portfolio-language', language)
  }, [theme, language])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="portfolio-shell">
      {isLoading ? (
        <div className="page-loader" aria-label="Loading portfolio">
          <div className="page-loader__spinner" />
        </div>
      ) : null}

      <AppHeader
        content={content}
        language={language}
        onLanguageToggle={() => setLanguage((current) => current === 'en' ? 'id' : 'en')}
        theme={theme}
        onThemeToggle={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
      />

      <main className="home-main mx-auto w-full max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <section id="home" className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-3xl border border-line bg-surface px-6 py-10 shadow-sm sm:px-10 lg:grid-cols-2 lg:gap-14 lg:px-14 lg:py-14">
          <div className="py-2">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              <span className="size-2 rounded-full bg-primary" />
              {language === 'en' ? 'Hello, I am Reza' : 'Halo, saya Reza'}
            </p>
            <h1 className="max-w-2xl text-5xl font-black leading-tight text-ink sm:text-6xl">
              {content.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-muted">
              {language === 'en' ? 'Web Developer · UI/UX Designer' : 'Web Developer · Desainer UI/UX'}
            </p>
            <p className="mt-2 max-w-xl leading-7 text-muted">{content.hero.subtitle}</p>
            <p className="mt-4 max-w-xl leading-7 text-ink">{content.hero.tagline}</p>

            <nav className="mt-6 border-b border-line pb-2" aria-label="Highlights">
              <div className="flex flex-wrap gap-4 sm:gap-6">
                {heroHighlights.map((item) => (
                  <span key={item} className="relative pb-2 text-sm font-bold uppercase tracking-[0.12em] text-muted after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 hover:text-primary hover:after:scale-x-100">
                    {item}
                  </span>
                ))}
              </div>
            </nav>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg">
                {content.hero.ctaPrimary}<FaArrowRight aria-hidden="true" />
              </Link>
              <Link to="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line px-6 py-3 font-bold text-ink transition hover:border-primary hover:text-primary">
                <FaEnvelope aria-hidden="true" />{content.hero.ctaSecondary}
              </Link>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 border-t border-line pt-6">
              <div>
                <strong className="block text-2xl font-black text-ink">{content.projects.length}+</strong>
                <span className="text-sm text-muted">{content.hero.statsLabel}</span>
              </div>
              <div className="border-l border-line pl-5">
                <strong className="block text-2xl font-black text-ink">{content.certificates.length}</strong>
                <span className="text-sm text-muted">{content.hero.statsCertificates}</span>
              </div>
              <div className="border-l border-line pl-5">
                <strong className="block text-2xl font-black text-ink">100%</strong>
                <span className="text-sm text-muted">{content.hero.statsCommitment}</span>
              </div>
            </div>
          </div>

          <aside className="mx-auto w-full max-w-md" aria-label="Profile summary">
            <div className="overflow-hidden border border-line bg-canvas shadow-xl sm:p-3" style={{ borderRadius: '2rem' }}>
              <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-4 sm:px-5">
                <span className="text-sm font-bold uppercase text-muted">Portfolio / 2026</span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">ITEBA</span>
              </div>

              <div className="overflow-hidden bg-linear-to-br from-primary/10 via-white to-primary/5 p-3 sm:p-4" style={{ borderRadius: '1.5rem' }}>
                <img
                  src={portraitImage}
                  alt="Reza Jauhari P."
                  className="w-full object-cover object-center shadow-inner ring-1 ring-black/5"
                  style={{ height: '500px', borderRadius: '1.25rem' }}
                />
              </div>

              <div className="px-5 pb-5 pt-4 sm:px-6">
                <h2 className="text-center text-xl font-extrabold text-ink">{content.hero.panelTitle}</h2>
                <p className="mt-3 text-center leading-7 text-muted">{content.hero.panelText}</p>
                <div className="mt-6 flex items-center justify-center gap-2 border-t border-line pt-5 text-sm font-semibold text-primary">
                  <FaCode aria-hidden="true" />
                  {language === 'en' ? 'Web development & interface design' : 'Pengembangan web & desain antarmuka'}
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-16" aria-labelledby="portfolio-links-title">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-bold uppercase text-primary">{content.about.eyebrow}</p>
              <h2 id="portfolio-links-title" className="text-3xl font-black text-ink">
                {language === 'en' ? 'Explore the full portfolio' : 'Jelajahi seluruh portofolio'}
              </h2>
            </div>
            <p className="max-w-lg leading-6 text-muted">
              {language === 'en'
                ? 'Explore my work, skills, and learning journey.'
                : 'Lihat karya, keahlian, dan perjalanan belajar saya.'}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {navLinks.filter((link) => link.id !== 'home').map((link) => (
              <Link
                key={link.id}
                to={link.href}
                className="group flex min-h-64 flex-col rounded-2xl border border-line bg-surface p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="mb-5 grid size-12 place-items-center rounded-xl bg-primary/10 text-xl text-primary transition group-hover:bg-primary group-hover:text-white">
                  {pageIcons[link.id]}
                </span>
                <h3 className="text-lg font-extrabold text-ink">{link.label}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{pageDescriptions[link.id]}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
                  {language === 'en' ? 'Open' : 'Buka'}
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-4 py-7 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-muted">
          <p>© {new Date().getFullYear()} Reza Jauhari P.</p>
          <div className="flex gap-5 font-semibold">
            <a className="transition hover:text-primary" href="https://github.com/rezajauhari555-code" target="_blank" rel="noopener noreferrer">{content.footer.github}</a>
            <a className="transition hover:text-primary" href="https://www.instagram.com/mangreza1502/?hl=id" target="_blank" rel="noopener noreferrer">{content.footer.instagram}</a>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Home
