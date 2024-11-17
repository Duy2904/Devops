export const downloadfileFromUrl = (fileUrl: string) => {
    fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileUrl.split('/').pop() ?? '';
            a.click();
            window.URL.revokeObjectURL(url);
        });
};

export const downloadfileFromBlob = (BlobFile: File, fileName: string) => {
    const url = URL.createObjectURL(BlobFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
};
