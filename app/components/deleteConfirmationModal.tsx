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
  import { Button } from "@/components/ui/button"
  
  interface DeleteConfirmationModalProps {
    id:number
    isOpen: boolean
    onClose: () => void
    onConfirm: (id:number) => void
    serviceName: string
  }
  
  export function DeleteConfirmationModal({ id, isOpen, onClose, onConfirm, serviceName }: DeleteConfirmationModalProps) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sei sicuro di voler eliminare questo servizio?</AlertDialogTitle>
            <AlertDialogDescription>
              Stai per eliminare il servizio "{serviceName}". Questa azione non può essere annullata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={()=>onConfirm(id)} className="bg-red-500 hover:bg-red-600" >
              Elimina
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }