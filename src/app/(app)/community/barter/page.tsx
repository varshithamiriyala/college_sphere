
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Repeat, Book, PlusCircle, Search } from "lucide-react";

const items = [
  { id: 1, name: "Data Structures Textbook (Used)", seller: "Alex D.", price: "Trade for Algorithms book" },
  { id: 2, name: "Complete Notes for Thermodynamics", seller: "Ben C.", price: "Trade for Physics notes" },
  { id: 3, name: "Scientific Calculator (Casio)", seller: "Carla F.", price: "₹500 or best offer" },
  { id: 4, name: "Unused Lab Coat (Medium)", seller: "Diana E.", price: "Trade" },
]

export default function BarterSystemPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                <Repeat className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Barter System</h1>
                <p className="text-muted-foreground">
                    Trade textbooks, notes, and study materials with peers.
                </p>
            </div>
        </div>
        <div className="flex gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search items..." className="pl-9"/>
            </div>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> List an Item</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(item => (
            <Card key={item.id}>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <CardTitle className="text-lg leading-tight">{item.name}</CardTitle>
                        <div className="p-2 rounded-full bg-muted">
                           <Book className="h-5 w-5 text-muted-foreground" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Seller: {item.seller}</p>
                    <p className="font-semibold mt-2">{item.price}</p>
                    <Button className="w-full mt-4">Make Offer</Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
