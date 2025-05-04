"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, MapPin, Flag, Clock, Award, RefreshCw } from "lucide-react";

export default function CountryGuessingGame() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="bg-slate-800 border-slate-700 shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-purple-400" />
              <CardTitle className="text-2xl">Country Guessing Game</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-slate-700 text-purple-300 flex items-center gap-1"
              >
                <Award className="h-3 w-3" />
                <span>Score: {0}</span>
              </Badge>
              <Badge
                variant="outline"
                className="bg-slate-700 text-amber-300 flex items-center gap-1"
              >
                <Clock className="h-3 w-3" />
                <span>{0}s</span>
              </Badge>
            </div>
          </div>
          <CardDescription className="text-slate-400">
            Use the clues to guess the country. More clues will be revealed after incorrect guesses.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Clues section */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <MapPin className="h-5 w-5 text-pink-400" />
              <span>Clues</span>
            </h3>
          </div>

          {/* Guess input */}
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter country name..."
              className="bg-slate-700 border-slate-600 focus-visible:ring-purple-500"
            />
            <Button
              onClick={() => {}}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Guess
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t border-slate-700 pt-4">
          <div className="text-sm text-slate-400 flex items-center gap-1">
            <Flag className="h-4 w-4" />
            <span>Attempts: {0}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {}}
            className="bg-slate-700 hover:bg-slate-600 text-slate-300 border-slate-600 flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            New Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
