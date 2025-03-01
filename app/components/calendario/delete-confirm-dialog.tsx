"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

interface DeleteConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (id:string) => void
  eventId: string,
}

export function DeleteConfirmDialog({ isOpen, onClose, onConfirm, eventId }: DeleteConfirmDialogProps) {

  const router=useRouter();

  function trigRerender(){
    onConfirm(eventId);

    router.refresh();
    router.push("/provacalendario/admin");
  }



  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sei sicuro di voler eliminare questo appuntamento?</AlertDialogTitle>
          <AlertDialogDescription>
            Stai per eliminare l&apos;appuntamento. Questa azione non può essere annullata.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annulla</AlertDialogCancel>
          <AlertDialogAction
            onClick={trigRerender}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Elimina
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

