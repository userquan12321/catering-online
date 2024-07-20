import { useEffect, useRef } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import classes from '@/styles/components/upload-btn.module.css'

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
  onChange: (url: string) => void
}

const UploadWidget = ({ onChange }: Props) => {
  const cloudinaryRef = useRef<CloudinaryWidget | null>(null)
  const widgetRef = useRef<{ open: () => void } | null>(null)

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary

    const widget = cloudinaryRef.current?.createUploadWidget(
      {
        cloudName: 'dubxrgytg',
        uploadPreset: 'mhx1xpbl',
      },
      (error, result) => {
        if (result?.event === 'success') {
          onChange(result.info.secure_url)
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
  }, [onChange])

  return (
    <Button
      className={classes.uploadBtn}
      type="primary"
      onClick={() => widgetRef.current?.open()}
    >
      <EditOutlined />
    </Button>
  )
}

export default UploadWidget
