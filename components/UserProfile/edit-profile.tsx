"use client"
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'


import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'

type EditProfileProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    defaultName?: string
    defaultImage?: string
    onSave: (payload: { name: string; imageUrl?: string | null; file?: File | null }) => Promise<void> | void
}

const MAX_FILE_MB = 5
const MAX_BYTES = MAX_FILE_MB * 1024 * 1024
const ALLOWED_TYPES = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/heic',
]

const EditProfile: React.FC<EditProfileProps> = ({ open, onOpenChange, defaultName, defaultImage, onSave }) => {
    const [name, setName] = useState<string>(defaultName || '')
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | undefined>(defaultImage)
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [showRemoveConfirm, setShowRemoveConfirm] = useState<boolean>(false)
    const [step, setStep] = useState<number>(1)
    const [fileName, setFileName] = useState<string | undefined>(undefined)

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (open) {
            setName(defaultName || '')
            setPreview(defaultImage)
            setFile(null)
            setUploadProgress(0)
            setIsUploading(false)
            setShowRemoveConfirm(false)
            setStep(1)
        }
    }, [open, defaultName, defaultImage])

    const onPickFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0]
        if (!f) return
        if (!ALLOWED_TYPES.includes(f.type)) {
            alert('Only PNG, HEIC, JPG or JPEG allowed')
            return
        }
        if (f.size > MAX_BYTES) {
            alert(`Max size ${MAX_FILE_MB}MB`)
            return
        }
        setFile(f)
        setPreview(URL.createObjectURL(f))
        setUploadProgress(0)
        setFileName(f.name)
        setIsUploading(true)

        setStep(3)

        let pct = 0
        const id = setInterval(() => {
            pct = Math.min(100, pct + Math.round(Math.random() * 18 + 6))
            setUploadProgress(pct)
            if (pct >= 100) {
                clearInterval(id)
                setIsUploading(false)
                setStep(4)
            }
        }, 200)
    }, [])

    const removeImage = useCallback(() => {
        setFile(null)
        setPreview(undefined)
        setUploadProgress(0)
        setFileName(undefined)
    }, [])

    const handleCancelUpload = useCallback(() => {
        setIsUploading(false)
        setUploadProgress(0)
        setFile(null)
        setPreview(undefined)
        setFileName(undefined)
        setStep(2)
    }, [])

    const handleSave = useCallback(async () => {
        let imageUrl: string | undefined | null = preview
        if (file) {
            setIsUploading(true)

            await new Promise<void>((resolve) => {
                let pct = 0
                const id = setInterval(() => {
                    pct = Math.min(100, pct + Math.round(Math.random() * 18 + 6))
                    setUploadProgress(pct)
                    if (pct >= 100) {
                        clearInterval(id)
                        resolve()
                    }
                }, 200)
            })
            imageUrl = preview || null
            setIsUploading(false)
        }
        await onSave({ name, imageUrl: imageUrl ?? null, file })
        onOpenChange(false)
    }, [file, onOpenChange, onSave, name, preview])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[720px] px-0" canClose={!isUploading}>
                {step === 1 && (
                    <div className="text-center py-10">
                        <p className="text-lg text-[#1F1F1F]">We&apos;re excited to have you join our community!<br />Get ready to make your profile unique!</p>
                        <div className="mt-8">
                            <Button className="w-[220px]" onClick={() => setStep(2)}>Let&apos;s go! 🚀</Button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <>
                        <DialogHeader>
                            <DialogTitle className='border-b pb-4 '><div className='px-4'>
                                Add User Details</div></DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6 px-4">
                            <div className="space-y-2">
                                <Label htmlFor="user-name">Name</Label>
                                <Input
                                    id="user-name"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isUploading}
                                />
                            </div>

                            <div className="space-y-3">
                                <Label>Image</Label>
                                <div className="border border-dashed rounded-lg p-8 text-center">
                                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onPickFile} />
                                    <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading}>Upload Image</Button>
                                    <div className="text-xs text-muted-foreground mt-3">Image should be in PNG, HEIC, JPG or JPEG. Max size {MAX_FILE_MB}MB</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-4 pt-2 w-full">
                                <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUploading} className="w-full">Cancel</Button>

                                <Button
                                    onClick={() => {
                                        if (file) {
                                            setStep(3)
                                        } else {
                                            setStep(4)
                                        }
                                    }}
                                    disabled={!name}
                                    className="w-full"
                                >
                                    Add Details
                                </Button>

                            </div>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <DialogHeader>
                            <DialogTitle className='border-b pb-4 '><div className='px-4'>
                                Add User Details</div></DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6 px-4">

                            <div className="space-y-2">
                                <Label htmlFor="user-name">Name</Label>
                                <Input
                                    id="user-name"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isUploading}
                                />
                            </div>


                            <div className="space-y-3">
                                <Label>Image</Label>
                                <div className="flex items-center gap-3">
                                    {preview && (
                                        <div className="size-16 overflow-hidden rounded-full">
                                            <img src={preview} alt="preview" className="size-full object-cover" />
                                        </div>
                                    )}
                                    {isUploading && (<div className="text-sm">{`Uploading ${uploadProgress}%...`}</div>)}
                                </div>


                                {isUploading && (
                                    <div className="flex items-center gap-2 mt-3">
                                        <div className="flex-1 max-w-[70%]">
                                            <Progress value={uploadProgress} />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleCancelUpload}
                                            className="text-gray-500 hover:text-red-500"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}
                            </div>


                            <div className="flex items-center justify-between gap-4 pt-2">
                                <Button
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                    disabled={isUploading}
                                    className="w-full"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => setStep(4)}
                                    disabled={isUploading}
                                    className="w-full"
                                >
                                    Add Details
                                </Button>
                            </div>
                        </div>
                    </>
                )}



                {step === 4 && (
                    <>
                        <DialogHeader>
                            <DialogTitle className='border-b pb-4 '><div className='px-4'>
                                Add User Details</div></DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6 px-4">

                            <div className="space-y-2">
                                <Label htmlFor="user-name">Name</Label>
                                <Input
                                    id="user-name"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>


                            <div className="space-y-3">
                                <Label>Image</Label>
                                <div className="flex items-center gap-3">
                                    {preview && (
                                        <div className="size-12 overflow-hidden rounded-full">
                                            <img src={preview} alt="preview" className="size-full object-cover" />
                                        </div>
                                    )}
                                    <div className="text-sm font-medium">{fileName || "Image selected"}</div>

                                    <div className="flex items-center gap-2 ml-auto">

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            Upload Image
                                        </Button>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={onPickFile}
                                        />

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="outline" size="sm">Remove Image</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Confirm Removing Image</AlertDialogTitle>
                                                </AlertDialogHeader>
                                                <div className="text-sm">
                                                    Are you sure you want to remove the profile image?
                                                </div>
                                                <div className="mt-4 flex justify-end gap-2">
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={removeImage}>Remove</AlertDialogAction>
                                                </div>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            </div>


                            <div className="flex items-center justify-between gap-4 pt-2">
                                <Button variant="outline" onClick={() => setStep(2)} className="w-full">
                                    Cancel
                                </Button>
                                <Button onClick={handleSave} className="w-full">
                                    Add Details
                                </Button>
                            </div>
                        </div>
                    </>
                )}


            </DialogContent>
        </Dialog>
    )
}

export default EditProfile