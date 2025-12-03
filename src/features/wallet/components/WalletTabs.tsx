'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { CurrencyInput } from './CurrencyInput';

interface WalletTabsProps {
    depositValue: string;
    setDepositValue: (v: string) => void;
    transferValue: string;
    setTransferValue: (v: string) => void;
    transferEmail: string;
    setTransferEmail: (v: string) => void;
    handleDeposit: () => void;
    handleTransfer: () => void;
}

export function WalletTabs(props: WalletTabsProps) {
    const [tab, setTab] = useState<'deposit' | 'transfer'>('deposit');

    return (
        <Tabs value={tab} onValueChange={(v) => setTab(v as 'deposit' | 'transfer')} className="space-y-4">
            <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="deposit">Depositar</TabsTrigger>
                <TabsTrigger value="transfer">Transferir</TabsTrigger>
            </TabsList>

            <TabsContent value="deposit">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Card className="p-4 mt-4">
                        <CardContent className="space-y-4">
                            <CurrencyInput
                                value={props.depositValue}
                                setValue={props.setDepositValue}
                                placeholder="Valor para depósito"
                            />
                            <Button className="w-full" onClick={props.handleDeposit} disabled={!props.depositValue}>
                                Depositar
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </TabsContent>

            <TabsContent value="transfer">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Card className="p-4 mt-4">
                        <CardContent className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Email do destinatário"
                                value={props.transferEmail}
                                onChange={(e) => props.setTransferEmail(e.target.value)}
                            />
                            <CurrencyInput
                                value={props.transferValue}
                                setValue={props.setTransferValue}
                                placeholder="Valor para transferência"
                            />
                            <Button className="w-full" onClick={props.handleTransfer} disabled={!props.transferValue || !props.transferEmail}>
                                Transferir
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </TabsContent>
        </Tabs>
    );
}