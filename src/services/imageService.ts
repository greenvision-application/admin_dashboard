export const resizeImageToFormData = async (
  imageFile: File | string,
  maxSizeMB = 2,
  fieldName = 'file'
): Promise<FormData> => {
  // Tạo đối tượng Blob từ File hoặc dataURL
  let imageBlob: Blob;
  let fileName = 'image.jpg';

  if (typeof imageFile === 'string') {
    // Xử lý dataURL từ camera
    try {
      const response = await fetch(imageFile);
      imageBlob = await response.blob();
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Failed to fetch image'
      );
    }
  } else {
    // Xử lý File từ input
    imageBlob = imageFile;
    fileName = imageFile.name;
  }

  // Kiểm tra kích thước ban đầu
  const originalSizeMB = imageBlob.size / (1024 * 1024);

  // Nếu ảnh đã nhỏ hơn giới hạn, trả về FormData trực tiếp
  if (originalSizeMB <= maxSizeMB) {
    const formData = new FormData();
    formData.append(fieldName, imageBlob, fileName);
    return formData;
  }

  // Resize ảnh
  const resizedBlob = await resizeImage(imageBlob, maxSizeMB);

  // Tạo FormData với ảnh đã resize
  const formData = new FormData();
  formData.append(fieldName, resizedBlob, fileName);

  return formData;
};

export const createBlobUrl = (imageFile: File | string): string => {
  if (typeof imageFile === 'string') {
    // Trường hợp đã là dataURL, cần chuyển thành Blob trước
    const byteString = atob(imageFile.split(',')[1]);
    const mimeType = imageFile.split(',')[0].split(':')[1].split(';')[0];

    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: mimeType });
    return URL.createObjectURL(blob);
  } else {
    // Trường hợp là File, tạo URL trực tiếp
    return URL.createObjectURL(imageFile);
  }
};

export const resizeImage = (
  imageBlob: Blob,
  maxSizeMB: number
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    // Tạo đối tượng Image để load ảnh
    const img = new Image();
    img.onload = () => {
      // Tính toán kích thước mới giữ nguyên tỷ lệ
      const maxDimension = 1800; // Kích thước tối đa ban đầu
      let width = img.width;
      let height = img.height;

      if (width > height && width > maxDimension) {
        height = (height / width) * maxDimension;
        width = maxDimension;
      } else if (height > maxDimension) {
        width = (width / height) * maxDimension;
        height = maxDimension;
      }

      // Tạo canvas để vẽ ảnh với kích thước mới
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Vẽ ảnh lên canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Tìm chất lượng phù hợp để đạt được kích thước mong muốn
      const targetSizeBytes = maxSizeMB * 1024 * 1024;
      const quality = 0.7; // Chất lượng ban đầu

      const compressWithQuality = (q: number) => {
        canvas.toBlob(
          blob => {
            if (!blob) {
              reject(new Error('Failed to create blob'));
              return;
            }

            // Nếu vẫn quá lớn và có thể giảm thêm
            if (blob.size > targetSizeBytes && q > 0.1) {
              // Giảm dần chất lượng
              compressWithQuality(q - 0.1);
            } else {
              resolve(blob);
            }
          },
          'image/jpeg',
          q
        );
      };

      // Bắt đầu nén với chất lượng ban đầu
      compressWithQuality(quality);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Load ảnh từ Blob
    img.src = URL.createObjectURL(imageBlob);
  });
};
