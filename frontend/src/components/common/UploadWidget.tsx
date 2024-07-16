import { UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

// Define the structure of the result from the Cloudinary upload widget
interface CloudinaryUploadResult {
  event: string
  info: {
    public_id: string
    version: number
    signature: string
    width: number
    height: number
    format: string
    resource_type: string
    created_at: string
    tags: string[]
    bytes: number
    type: string
    etag: string
    placeholder: boolean
    url: string
    secure_url: string
    original_filename: string
  }
}

interface CloudinaryWidget {
  createUploadWidget: (
    options: { cloudName: string; uploadPreset: string },
    callback: (
      error: Error | null,
      result: CloudinaryUploadResult | null,
    ) => void,
  ) => void
  open: () => void
}

interface Props {
  imageUrl: string
  setImageUrl: Dispatch<SetStateAction<string>>
}

const UploadWidget = ({ imageUrl, setImageUrl }: Props) => {
  const cloudinaryRef = useRef<CloudinaryWidget | null>(null)
  const widgetRef = useRef<{ open: () => void } | null>(null)

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    console.log(cloudinaryRef.current)

    const widget = cloudinaryRef.current?.createUploadWidget(
      {
        cloudName: 'dubxrgytg',
        uploadPreset: 'mhx1xpbl',
      },
      (error, result) => {
        if (result?.event === 'success') {
          setImageUrl(result.info.secure_url)
          return
        }
        if (error) {
          console.log(error)
        }
      },
    )

    if (widget && 'open' in widget) {
      widgetRef.current = widget
      return
    }
    widgetRef.current = null
  }, [])

  return (
    <div style={{ width: 'fit-content', display: 'grid', gap: '1rem' }}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Avatar"
          style={{ width: '200px', aspectRatio: 1, objectFit: 'cover' }}
        />
      ) : (
        <UserOutlined style={{ fontSize: '200px', border: '1px solid' }} />
      )}
      <Button
        type="primary"
        style={{ display: 'block' }}
        onClick={() => widgetRef.current?.open()}
      >
        Upload Image
      </Button>
    </div>
  )
}

export default UploadWidget
