import { ITask } from "../types/tasks.js";

const baseUrl = 'http://localhost:4000';

export const getAllTasks = async (): Promise<ITask[]> => {
  return fetch(`${baseUrl}/task/all`, {
    cache: 'no-store',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjY2YTQ5NmQwZGI0OGZkNGQxODgzZDQ3YiIsIm5hbWUiOiJCZXN0IFdheSIsImVtYWlsIjoiYmVzdC53YXlAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRJU0dpcGxZY21lLktaanhyUDNwbGJPc3oyOVFoWENTZFBaZVl6aW1SaVVOekhVRG84cy9OaSIsImNyZWF0ZWRBdCI6IjIwMjQtMDctMjdUMDY6NDI6MjQuOTI4WiIsIl9fdiI6MCwicmVmcmVzaF90b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUp3WVhsc2IyRmtJanA3SWw5cFpDSTZJalkyWVRRNU5tUXdaR0kwT0daa05HUXhPRGd6WkRRM1lpSXNJbTVoYldVaU9pSkNaWE4wSUZkaGVTSXNJbVZ0WVdsc0lqb2lZbVZ6ZEM1M1lYbEFaWGhoYlhCc1pTNWpiMjBpTENKd1lYTnpkMjl5WkNJNklpUXlZaVF4TUNSSlUwZHBjR3haWTIxbExrdGFhbmh5VUROd2JHSlBjM295T1ZGb1dFTlRaRkJhWlZsNmFXMVNhVlZPZWtoVlJHODRjeTlPYVNJc0ltTnlaV0YwWldSQmRDSTZJakl3TWpRdE1EY3RNamRVTURZNk5ESTZNalF1T1RJNFdpSXNJbDlmZGlJNk1Dd2ljbVZtY21WemFGOTBiMnRsYmlJNkltVjVTbWhpUjJOcFQybEtTVlY2U1RGT2FVbHpTVzVTTldORFNUWkphM0JZVmtOS09TNWxlVXAzV1Zoc2MySXlSbXRKYW5BM1NXdzVjRnBEU1RaSmFsa3lXVlJSTlU1dFVYZGFSMGt3VDBkYWEwNUhVWGhQUkdkNldrUlJNMWxwU1hOSmJUVm9ZbGRWYVU5cFNrTmFXRTR3U1Vaa2FHVlRTWE5KYlZaMFdWZHNjMGxxYjJsWmJWWjZaRU0xTTFsWWJFRmFXR2hvWWxoQ2MxcFROV3BpTWpCcFRFTktkMWxZVG5wa01qbDVXa05KTmtscFVYbFphVkY0VFVOU1NsVXdaSEJqUjNoYVdUSXhiRXhyZEdGaGJtaDVWVVJPZDJKSFNsQmpNMjk1VDFaR2IxZEZUbFJhUmtKaFdsWnNObUZYTVZOaFZsWlBaV3RvVmxKSE9EUmplVGxQWVZOSmMwbHRUbmxhVjBZd1dsZFNRbVJEU1RaSmFrbDNUV3BSZEUxRVkzUk5hbVJWVFVSWk5rNUVTVFpOYWxGMVQxUkpORmRwU1hOSmJEbG1aR2xKTmsxSU1ITkpiV3hvWkVOSk5rMVVZM2xOYWtFMFRsUkZNazFUZDJsYVdHaDNTV3B2ZUU1NlNYbE5SR2MwVG5wWmVHWlJMakJ3TVY5S01raElTSE5sYWpJM1RHUk9aakZTY1hnd09XVmZWVkZJWnpsNVduTmlRamh3VVVaTVJra2lmU3dpYVdGMElqb3hOekl5TURnMU1UZ3pMQ0psZUhBaU9qRTNNakl3T0RnM09ETjkuWFF1MHRYbzFEWE1pN2F5bC13aHd0Z01UN0RJU3FHd1U5QzliUUpsSTJ5ZyJ9LCJpYXQiOjE3MjIwOTQyMzIsImV4cCI6MTcyMjA5NzgzMn0.Pqwg4_CSyDe3nKrb8UdSwQ3yQ6Hsck2X48Q772qD4vQ'
    },
  })
    .then(res => res.json())
    .catch(() => []);
}

export const addTask = async (task: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjY2YTQ5NmQwZGI0OGZkNGQxODgzZDQ3YiIsIm5hbWUiOiJCZXN0IFdheSIsImVtYWlsIjoiYmVzdC53YXlAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRJU0dpcGxZY21lLktaanhyUDNwbGJPc3oyOVFoWENTZFBaZVl6aW1SaVVOekhVRG84cy9OaSIsImNyZWF0ZWRBdCI6IjIwMjQtMDctMjdUMDY6NDI6MjQuOTI4WiIsIl9fdiI6MCwicmVmcmVzaF90b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUp3WVhsc2IyRmtJanA3SWw5cFpDSTZJalkyWVRRNU5tUXdaR0kwT0daa05HUXhPRGd6WkRRM1lpSXNJbTVoYldVaU9pSkNaWE4wSUZkaGVTSXNJbVZ0WVdsc0lqb2lZbVZ6ZEM1M1lYbEFaWGhoYlhCc1pTNWpiMjBpTENKd1lYTnpkMjl5WkNJNklpUXlZaVF4TUNSSlUwZHBjR3haWTIxbExrdGFhbmh5VUROd2JHSlBjM295T1ZGb1dFTlRaRkJhWlZsNmFXMVNhVlZPZWtoVlJHODRjeTlPYVNJc0ltTnlaV0YwWldSQmRDSTZJakl3TWpRdE1EY3RNamRVTURZNk5ESTZNalF1T1RJNFdpSXNJbDlmZGlJNk1Dd2ljbVZtY21WemFGOTBiMnRsYmlJNkltVjVTbWhpUjJOcFQybEtTVlY2U1RGT2FVbHpTVzVTTldORFNUWkphM0JZVmtOS09TNWxlVXAzV1Zoc2MySXlSbXRKYW5BM1NXdzVjRnBEU1RaSmFsa3lXVlJSTlU1dFVYZGFSMGt3VDBkYWEwNUhVWGhQUkdkNldrUlJNMWxwU1hOSmJUVm9ZbGRWYVU5cFNrTmFXRTR3U1Vaa2FHVlRTWE5KYlZaMFdWZHNjMGxxYjJsWmJWWjZaRU0xTTFsWWJFRmFXR2hvWWxoQ2MxcFROV3BpTWpCcFRFTktkMWxZVG5wa01qbDVXa05KTmtscFVYbFphVkY0VFVOU1NsVXdaSEJqUjNoYVdUSXhiRXhyZEdGaGJtaDVWVVJPZDJKSFNsQmpNMjk1VDFaR2IxZEZUbFJhUmtKaFdsWnNObUZYTVZOaFZsWlBaV3RvVmxKSE9EUmplVGxQWVZOSmMwbHRUbmxhVjBZd1dsZFNRbVJEU1RaSmFrbDNUV3BSZEUxRVkzUk5hbVJWVFVSWk5rNUVTVFpOYWxGMVQxUkpORmRwU1hOSmJEbG1aR2xKTmsxSU1ITkpiV3hvWkVOSk5rMVVZM2xOYWtFMFRsUkZNazFUZDJsYVdHaDNTV3B2ZUU1NlNYbE5SR2MwVG5wWmVHWlJMakJ3TVY5S01raElTSE5sYWpJM1RHUk9aakZTY1hnd09XVmZWVkZJWnpsNVduTmlRamh3VVVaTVJra2lmU3dpYVdGMElqb3hOekl5TURnMU1UZ3pMQ0psZUhBaU9qRTNNakl3T0RnM09ETjkuWFF1MHRYbzFEWE1pN2F5bC13aHd0Z01UN0RJU3FHd1U5QzliUUpsSTJ5ZyJ9LCJpYXQiOjE3MjIwOTQyMzIsImV4cCI6MTcyMjA5NzgzMn0.Pqwg4_CSyDe3nKrb8UdSwQ3yQ6Hsck2X48Q772qD4vQ'
    },
    body: JSON.stringify(task)
  })
  const newTask = await res.json();
  return newTask;
}

export const editTask = async (task: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/task?id=${task._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjY2YTQ5NmQwZGI0OGZkNGQxODgzZDQ3YiIsIm5hbWUiOiJCZXN0IFdheSIsImVtYWlsIjoiYmVzdC53YXlAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRJU0dpcGxZY21lLktaanhyUDNwbGJPc3oyOVFoWENTZFBaZVl6aW1SaVVOekhVRG84cy9OaSIsImNyZWF0ZWRBdCI6IjIwMjQtMDctMjdUMDY6NDI6MjQuOTI4WiIsIl9fdiI6MCwicmVmcmVzaF90b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUp3WVhsc2IyRmtJanA3SWw5cFpDSTZJalkyWVRRNU5tUXdaR0kwT0daa05HUXhPRGd6WkRRM1lpSXNJbTVoYldVaU9pSkNaWE4wSUZkaGVTSXNJbVZ0WVdsc0lqb2lZbVZ6ZEM1M1lYbEFaWGhoYlhCc1pTNWpiMjBpTENKd1lYTnpkMjl5WkNJNklpUXlZaVF4TUNSSlUwZHBjR3haWTIxbExrdGFhbmh5VUROd2JHSlBjM295T1ZGb1dFTlRaRkJhWlZsNmFXMVNhVlZPZWtoVlJHODRjeTlPYVNJc0ltTnlaV0YwWldSQmRDSTZJakl3TWpRdE1EY3RNamRVTURZNk5ESTZNalF1T1RJNFdpSXNJbDlmZGlJNk1Dd2ljbVZtY21WemFGOTBiMnRsYmlJNkltVjVTbWhpUjJOcFQybEtTVlY2U1RGT2FVbHpTVzVTTldORFNUWkphM0JZVmtOS09TNWxlVXAzV1Zoc2MySXlSbXRKYW5BM1NXdzVjRnBEU1RaSmFsa3lXVlJSTlU1dFVYZGFSMGt3VDBkYWEwNUhVWGhQUkdkNldrUlJNMWxwU1hOSmJUVm9ZbGRWYVU5cFNrTmFXRTR3U1Vaa2FHVlRTWE5KYlZaMFdWZHNjMGxxYjJsWmJWWjZaRU0xTTFsWWJFRmFXR2hvWWxoQ2MxcFROV3BpTWpCcFRFTktkMWxZVG5wa01qbDVXa05KTmtscFVYbFphVkY0VFVOU1NsVXdaSEJqUjNoYVdUSXhiRXhyZEdGaGJtaDVWVVJPZDJKSFNsQmpNMjk1VDFaR2IxZEZUbFJhUmtKaFdsWnNObUZYTVZOaFZsWlBaV3RvVmxKSE9EUmplVGxQWVZOSmMwbHRUbmxhVjBZd1dsZFNRbVJEU1RaSmFrbDNUV3BSZEUxRVkzUk5hbVJWVFVSWk5rNUVTVFpOYWxGMVQxUkpORmRwU1hOSmJEbG1aR2xKTmsxSU1ITkpiV3hvWkVOSk5rMVVZM2xOYWtFMFRsUkZNazFUZDJsYVdHaDNTV3B2ZUU1NlNYbE5SR2MwVG5wWmVHWlJMakJ3TVY5S01raElTSE5sYWpJM1RHUk9aakZTY1hnd09XVmZWVkZJWnpsNVduTmlRamh3VVVaTVJra2lmU3dpYVdGMElqb3hOekl5TURnMU1UZ3pMQ0psZUhBaU9qRTNNakl3T0RnM09ETjkuWFF1MHRYbzFEWE1pN2F5bC13aHd0Z01UN0RJU3FHd1U5QzliUUpsSTJ5ZyJ9LCJpYXQiOjE3MjIwOTQyMzIsImV4cCI6MTcyMjA5NzgzMn0.Pqwg4_CSyDe3nKrb8UdSwQ3yQ6Hsck2X48Q772qD4vQ'
    },
    body: JSON.stringify(task)
  })

  return await res.json();;
}

export const deleteTask = async (id: string): Promise<any> => {
  const res = await fetch(`${baseUrl}/task?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjY2YTQ5NmQwZGI0OGZkNGQxODgzZDQ3YiIsIm5hbWUiOiJCZXN0IFdheSIsImVtYWlsIjoiYmVzdC53YXlAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRJU0dpcGxZY21lLktaanhyUDNwbGJPc3oyOVFoWENTZFBaZVl6aW1SaVVOekhVRG84cy9OaSIsImNyZWF0ZWRBdCI6IjIwMjQtMDctMjdUMDY6NDI6MjQuOTI4WiIsIl9fdiI6MCwicmVmcmVzaF90b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUp3WVhsc2IyRmtJanA3SWw5cFpDSTZJalkyWVRRNU5tUXdaR0kwT0daa05HUXhPRGd6WkRRM1lpSXNJbTVoYldVaU9pSkNaWE4wSUZkaGVTSXNJbVZ0WVdsc0lqb2lZbVZ6ZEM1M1lYbEFaWGhoYlhCc1pTNWpiMjBpTENKd1lYTnpkMjl5WkNJNklpUXlZaVF4TUNSSlUwZHBjR3haWTIxbExrdGFhbmh5VUROd2JHSlBjM295T1ZGb1dFTlRaRkJhWlZsNmFXMVNhVlZPZWtoVlJHODRjeTlPYVNJc0ltTnlaV0YwWldSQmRDSTZJakl3TWpRdE1EY3RNamRVTURZNk5ESTZNalF1T1RJNFdpSXNJbDlmZGlJNk1Dd2ljbVZtY21WemFGOTBiMnRsYmlJNkltVjVTbWhpUjJOcFQybEtTVlY2U1RGT2FVbHpTVzVTTldORFNUWkphM0JZVmtOS09TNWxlVXAzV1Zoc2MySXlSbXRKYW5BM1NXdzVjRnBEU1RaSmFsa3lXVlJSTlU1dFVYZGFSMGt3VDBkYWEwNUhVWGhQUkdkNldrUlJNMWxwU1hOSmJUVm9ZbGRWYVU5cFNrTmFXRTR3U1Vaa2FHVlRTWE5KYlZaMFdWZHNjMGxxYjJsWmJWWjZaRU0xTTFsWWJFRmFXR2hvWWxoQ2MxcFROV3BpTWpCcFRFTktkMWxZVG5wa01qbDVXa05KTmtscFVYbFphVkY0VFVOU1NsVXdaSEJqUjNoYVdUSXhiRXhyZEdGaGJtaDVWVVJPZDJKSFNsQmpNMjk1VDFaR2IxZEZUbFJhUmtKaFdsWnNObUZYTVZOaFZsWlBaV3RvVmxKSE9EUmplVGxQWVZOSmMwbHRUbmxhVjBZd1dsZFNRbVJEU1RaSmFrbDNUV3BSZEUxRVkzUk5hbVJWVFVSWk5rNUVTVFpOYWxGMVQxUkpORmRwU1hOSmJEbG1aR2xKTmsxSU1ITkpiV3hvWkVOSk5rMVVZM2xOYWtFMFRsUkZNazFUZDJsYVdHaDNTV3B2ZUU1NlNYbE5SR2MwVG5wWmVHWlJMakJ3TVY5S01raElTSE5sYWpJM1RHUk9aakZTY1hnd09XVmZWVkZJWnpsNVduTmlRamh3VVVaTVJra2lmU3dpYVdGMElqb3hOekl5TURnMU1UZ3pMQ0psZUhBaU9qRTNNakl3T0RnM09ETjkuWFF1MHRYbzFEWE1pN2F5bC13aHd0Z01UN0RJU3FHd1U5QzliUUpsSTJ5ZyJ9LCJpYXQiOjE3MjIwOTQyMzIsImV4cCI6MTcyMjA5NzgzMn0.Pqwg4_CSyDe3nKrb8UdSwQ3yQ6Hsck2X48Q772qD4vQ'
    },
  })

  return await res.json();
}