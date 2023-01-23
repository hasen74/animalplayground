import Router from 'next/router'
import { Dispatch, SetStateAction } from 'react'

// function to setQuantity onClick by getting value from html element
export function getQuantityValue(setQuantity: Dispatch<SetStateAction<number>>) {
  let input: HTMLInputElement | null = document.getElementById('quantity') as HTMLInputElement
  setQuantity(input.valueAsNumber)
}

// function to logout
export function logout() {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('userId')
  sessionStorage.removeItem('role')
  Router.push('/')
}

// function to wait some time
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
