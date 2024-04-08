import React, { useState, useCallback } from 'react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-easy-crop';
import CroppedAreaPixels from 'react-easy-crop';

interface UploadPhotoProps {}
const UploadPhoto: React.FC<UploadPhotoProps> = () => {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<CroppedAreaPixels | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const onCropComplete = useCallback((croppedArea: CroppedAreaPixels, croppedAreaPixels: CroppedAreaPixels) => {
    setCroppedImage(croppedAreaPixels);
  }, []);

  const handleCropChange = useCallback((crop: { x: number; y: number }) => {
    setCrop(crop);
  }, []);

  const handleZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);

  const handleUpload = () => {
    if (!image || !croppedImage) return;
    // Send cropped image to your server for further processing
    console.log('Cropped Image:', croppedImage);
  };

  return (
    <div>
      <DropzoneArea
        onChange={onDrop}
        acceptedFiles={['image/*']}
        maxFileSize={5000000} // 5MB
        dropzoneText="Drag and drop an image here or click"
      />
      {image && (
        <div>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={handleCropChange}
            onZoomChange={handleZoomChange}
            onCropComplete={onCropComplete}
          />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default UploadPhoto;
