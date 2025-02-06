import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"

interface ServiceCardProps {
  id: number
  title: string
  imageUrl: string
  onEdit: (id: number) => void
  onDelete: (id: number,title:string, imageUrl:string) => void
}

export function ServiceCard({ id, title, imageUrl, onEdit, onDelete }: ServiceCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden mx-auto">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-semibold truncate">{title}</CardTitle>
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <Button variant="outline" size="sm" onClick={() => onEdit(id)}>
          <Edit className="mr-2 h-4 w-4" />
          Modifica
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(id,title, imageUrl)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Elimina
        </Button>
      </CardFooter>
    </Card>
  )
}