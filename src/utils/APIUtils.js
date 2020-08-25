import React from "react";

export function fetchTemplates() {
  return fetch("http://localhost:3000/api/templates", {
    method: "GET",
  }).then((res) => res.json());
}

export function fetchTemplatesByID(id) {
  return fetch(`http://localhost:3000/api/templates/${id}`, {
    method: "GET",
  }).then((res) => res.json());
}

export function saveNewTemplate(data) {
  return fetch("http://localhost:3000/api/templates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export function updateTemplate(id, data) {
  return fetch(`http://localhost:3000/api/templates/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export function deleteTemplate(id) {
  return fetch(`http://localhost:3000/api/templates/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export function fetchCustomers() {
  return fetch("http://localhost:3000/api/customers", {
    method: "GET",
  }).then((res) => res.json());
}

export function fetchCustomerByID(id) {
  return fetch(`http://localhost:3000/api/customers/${id}`, {
    method: "GET",
  }).then((res) => res.json());
}

export function fetchCustomersByEmail(email) {
  return fetch(`http://localhost:3000/api/customers?email=${email}`, {
    method: "GET",
  }).then((res) => res.json());
}

export function fetchCustomersByPartialEmail(partial_email) {
  return fetch(
    `http://localhost:3000/api/customers?email_like=${partial_email}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
}
