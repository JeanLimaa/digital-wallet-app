'use client';

import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatToBrlCurrency } from '@/lib/currency';

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  value?: string | number;
  description?: string;
  email?: string;
}

export function ConfirmDialog(props: Props) {
  return (
    <Dialog open={props.open} onOpenChange={props.onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription className='flex flex-col gap-y-2'>
            {props.description && <span className="text-sm mb-2">{props.description}</span>}
            {props.value && <span>Valor: {formatToBrlCurrency(props.value)}</span>}
            {props.email && <span>Para: {props.email}</span>}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={props.onCancel}>Cancelar</Button>
          <Button onClick={props.onConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
