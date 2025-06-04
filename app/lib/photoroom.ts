const PHOTOROOM_API_KEY = 'sandbox_sk_pr_c05fdbfe2911e9085fecae4d9f0d56e98d22f326'
const PHOTOROOM_API_URL = 'https://sdk.photoroom.com/v1/segment'

export interface PhotoRoomResponse {
  result_b64: string
}

export interface PhotoRoomError {
  error: string
  message: string
}

export async function removeBackground(imageFile: File): Promise<string> {
  const formData = new FormData()
  formData.append('image_file', imageFile)
  formData.append('bg_color', 'transparent')
  formData.append('format', 'PNG')
  formData.append('crop', 'false')

  try {
    const response = await fetch(PHOTOROOM_API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': PHOTOROOM_API_KEY,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorData: PhotoRoomError = await response.json()
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    const data: PhotoRoomResponse = await response.json()
    
    // Convert base64 to data URL
    return `data:image/png;base64,${data.result_b64}`
  } catch (error) {
    console.error('PhotoRoom API error:', error)
    throw new Error('Failed to remove background. Please try again.')
  }
}

export async function removeBackgroundFromUrl(imageUrl: string): Promise<string> {
  const formData = new FormData()
  formData.append('image_url', imageUrl)
  formData.append('bg_color', 'transparent')
  formData.append('format', 'PNG')
  formData.append('crop', 'false')

  try {
    const response = await fetch(PHOTOROOM_API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': PHOTOROOM_API_KEY,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorData: PhotoRoomError = await response.json()
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    const data: PhotoRoomResponse = await response.json()
    
    return `data:image/png;base64,${data.result_b64}`
  } catch (error) {
    console.error('PhotoRoom API error:', error)
    throw new Error('Failed to remove background. Please try again.')
  }
} 